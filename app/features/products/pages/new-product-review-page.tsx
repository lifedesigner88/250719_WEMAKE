import type { Route } from "./+types/new-product-review-page";
import PageHeader from "~/common/components/page-header";
import { useParams, Form, useNavigate } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { Textarea } from "~/common/components/ui/textarea";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Write a Review | wemake" },
        { name: "description", content: "Share your thoughts about this product" }
    ];
};

export default function NewProductReviewPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // In a real app, this would submit the review to the server
        // For now, just navigate back to the reviews page
        navigate(`/products/${productId}/reviews`);
    };

    return (
        <div className="space-y-10">
            <PageHeader 
                title="Write a Review" 
                description="Share your experience with this product"
            />
            
            <div className="max-w-screen-md mx-auto">
                <h2 className="text-2xl font-bold mb-6">Review for Product ID: {productId}</h2>
                
                <Form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="rating" className="block mb-2">Rating</Label>
                        <div className="flex gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    onClick={() => setRating(i + 1)}
                                    className="text-3xl"
                                >
                                    <span className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <Label htmlFor="review" className="block mb-2">Your Review</Label>
                        <Textarea 
                            id="review"
                            name="review"
                            placeholder="Share your thoughts about this product..."
                            required
                            rows={6}
                            className="w-full"
                        />
                    </div>
                    
                    <div className="flex gap-4">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => navigate(`/products/${productId}/reviews`)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={rating === 0}>
                            Submit Review
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}