CREATE OR REPLACE view comunity_post_list_view AS
SELECT p.post_id         AS "postId",
       p.title,
       p.created_at      AS "timeAgo",
       t.name            AS topics,
       pr.username       AS author,
       pr.avatar         AS "avatarSrc",
       p.upvotes         AS "voteCount"
--        COUNT(pu.post_id) AS "voteCount"
FROM posts p
         INNER JOIN topics t USING (topic_id)
         INNER JOIN profiles pr USING (profile_id)
         LEFT JOIN post_upvotes pu USING (post_id)
GROUP BY p.post_id, t.name, pr.username, pr.avatar;

SELECT * FROM comunity_post_list_view;
