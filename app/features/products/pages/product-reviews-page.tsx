import type { Route } from "./+types/product-reviews-page";
import PageHeader from "~/common/components/page-header";
import { useParams, Link } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Product Reviews | wemake" },
        { name: "description", content: "View and add reviews for this product" }
    ];
};

export default function ProductReviewsPage() {
    const { productId } = useParams();

    // Mock reviews data
    const reviews = [
        {
            id: 1,
            author: "User1",
            rating: 5,
            comment: "Great product, highly recommend!",
            date: "2025-07-28"
        },
        {
            id: 2,
            author: "User2",
            rating: 4,
            comment: "Good product but could be improved in some areas.",
            date: "2025-07-25"
        },
        {
            id: 3,
            author: "User3",
            rating: 3,
            comment: "Average product, meets basic needs.",
            date: "2025-07-20"
        }
    ];

    return (
        <div className="space-y-10">
            <PageHeader 
                title="Product Reviews" 
                description="See what others are saying about this product"
            />
            
            <div className="max-w-screen-lg mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Reviews for Product ID: {productId}</h2>
                    <Link to={`/products/${productId}/reviews/new`}>
                        <Button>Write a Review</Button>
                    </Link>
                </div>
                
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="p-4 border rounded-lg bg-card">
                            <div className="flex justify-between mb-2">
                                <div className="font-semibold">{review.author}</div>
                                <div className="text-muted-foreground">{review.date}</div>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="mr-2">Rating:</div>
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}