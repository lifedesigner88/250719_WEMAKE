CREATE OR REPLACE VIEW public.get_ideas_view AS
SELECT g.gpt_idea_id,
       g.idea,
       g.views,
       g.created_at,
       (g.claimed_at IS NOT NULL) AS is_claimed,
       COUNT(l.gpt_idea_id)       AS likes
FROM public.gpt_ideas AS g
         LEFT JOIN public.gpt_ideas_likes AS l USING (gpt_idea_id)
GROUP BY g.gpt_idea_id;

SELECT *
FROM get_ideas_view;