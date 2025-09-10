CREATE OR REPLACE FUNCTION find_or_create_chat_room(user1_id UUID, user2_id UUID)
    RETURNS INTEGER AS
$$
DECLARE
    existing_room_id INTEGER;
    new_room_id      INTEGER;
    lock_key         BIGINT;
    sorted_user1     UUID;
    sorted_user2     UUID;
BEGIN

    IF user1_id = user2_id THEN
        RAISE EXCEPTION 'Cannot create a chat room with yourself';
    END IF;

    SELECT LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id)
    INTO sorted_user1 , sorted_user2;

    lock_key := abs(hashtext(sorted_user1::text || '_' || sorted_user2::text));

    perform pg_advisory_xact_lock(lock_key);

    with user_rooms as (select message_room_id
                        from message_room_members
                        where profile_id IN (user1_id, user2_id)
                        group by message_room_id
                        having count(*) = 2),
         room_total_members as (select ur.message_room_id
                                from user_rooms ur
                                         join message_room_members mrm on mrm.message_room_id = ur.message_room_id
                                group by ur.message_room_id
                                having count(*) = 2
                                limit 1)
    select rtm.message_room_id
    into existing_room_id
    from room_total_members rtm;

    if existing_room_id is not null then
        return existing_room_id;
    end if;

    -- 새 채팅방 생성
    INSERT INTO message_rooms (created_at)
    VALUES (NOW())
    RETURNING message_room_id INTO new_room_id;

    -- 멤버 추가 (RETURNING 제거)
    INSERT INTO message_room_members (message_room_id, profile_id, created_at)
    SELECT new_room_id, unnest(ARRAY[sorted_user1, sorted_user2]), NOW();

    RETURN new_room_id;

END;
$$ LANGUAGE plpgsql;


SELECT find_or_create_chat_room(
     '5f06c46b-421e-4c42-8064-6da0c1dd117f'::UUID,
     '47e777b7-0788-42fe-b95a-7ab2bad94283'::UUID
) AS room_id;
