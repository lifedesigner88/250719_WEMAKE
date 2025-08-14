CREATE OR REPLACE VIEW public.get_ideas_view AS
SELECT g.gpt_idea_id,
       CASE
           WHEN g.claimed_at IS NULL
               THEN g.idea
           ELSE
               'ClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimed'
           END                    AS idea,
       g.views,
       g.created_at,
       (g.claimed_at IS NOT NULL) AS is_claimed,
       COUNT(l.gpt_idea_id)       AS likes,
       p.username                 AS claimed_by_username,
       p.avatar                   AS claimed_by_avatar
FROM public.gpt_ideas AS g
         LEFT JOIN public.gpt_ideas_likes AS l USING (gpt_idea_id)
         LEFT JOIN public.profiles AS p ON g.claimed_by = p.profile_id
GROUP BY g.gpt_idea_id, p.username, p.avatar;

SELECT *
FROM get_ideas_view;


