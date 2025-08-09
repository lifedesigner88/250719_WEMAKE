CREATE OR REPLACE VIEW product_overview_view AS
SELECT p.product_id,
       p.name,
       p.tagline,
       p.description,
       p.how_it_works,
       p.icon,
       p.url,
       p.stats -> 'upvotes' AS upvotes,
       p.stats -> 'views'   AS views,
       p.stats -> 'reviews'  AS reviews,
       COALESCE(AVG(pr.rating), 0.0) AS average_rating
FROM public.products p
         LEFT JOIN public.reviews AS pr USING (product_id)
GROUP BY p.product_id;

SELECT * FROM product_overview_view ;

