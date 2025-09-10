CREATE OR REPLACE view comunity_post_list_view AS
SELECT p.post_id    AS "postId",
       p.title,
       p.created_at AS "timeAgo",
       t.name       AS "topics",
       pr.username  AS "author",
       pr.avatar    AS "avatarSrc",
       p.upvotes    AS "voteCount",
       t.slug       AS topic_slug,
       (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id = p.post_id AND post_upvotes.profile_id = auth.uid())) AS is_upvoted
FROM posts p
         INNER JOIN topics t USING (topic_id)
         INNER JOIN profiles pr USING (profile_id);

SELECT *
FROM comunity_post_list_view;
