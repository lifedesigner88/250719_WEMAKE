CREATE OR REPLACE VIEW community_post_detail AS
SELECT p.post_id,
       p.title,
       p.content,
       p.upvotes,
       p.created_at,
       t.topic_id,
       t.name                                                                   as topic_name,
       t.slug                                                                   as topic_slug,
       COUNT(pr.post_reply_id)                                                  as replies,
       pf.name                                                                  as author_name,
       pf.avatar                                                                as author_avatar,
       pf.role                                                                  as author_role,
       pf.created_at                                                            as author_created_at,
       (SELECT COUNT(*) FROM products WHERE products.profile_id = p.profile_id) as products,
       (SELECT EXISTS (SELECT 1
                       FROM public.post_upvotes
                       WHERE post_upvotes.post_id = p.post_id
                         AND post_upvotes.profile_id = auth.uid()))             AS is_upvoted
FROM posts p
         INNER JOIN topics t USING (topic_id)
         LEFT JOIN post_replies pr USING (post_id)
         INNER JOIN profiles pf ON (pf.profile_id = p.profile_id)
GROUP BY p.post_id,
         t.topic_id, t.name, t.slug,
         pf.name, pf.avatar, pf.role, pf.created_at, pf.profile_id;

SELECT *
FROM community_post_detail;

