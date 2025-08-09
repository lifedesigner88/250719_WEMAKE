import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";


export default function CreateReviewDialog({ isDialogOpen }: { isDialogOpen: boolean }) {
    const [rating, setRating] = useState<number>(0);
    const [hoveredStar, setHoveredStar] = useState<number>(0);

    useEffect(() => { // 창이 열리거다 닫히면 별점 초기화.
        setRating(0);
        setHoveredStar(0);
    }, [isDialogOpen]);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl mt-4">
                    What do you think of this product?
                </DialogTitle>
                <DialogDescription>
                    Share your thoughts and experiences with this product.
                </DialogDescription>
            </DialogHeader>
            <Form method="post" className="space-y-10">
                <div className={"flex flex-col items-start"}>
                    <Label className="flex flex-col gap-1 items-start mt-5">
                        Rating
                        <small className="text-muted-foreground">
                            What would you rate this product?
                        </small>
                    </Label>
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label
                                key={star}
                                className="relative cursor-pointer"
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                            >
                                <StarIcon
                                    className="size-5 text-yellow-400"
                                    fill={
                                        hoveredStar >= star || rating >= star
                                            ? "currentColor"
                                            : "none"
                                    }
                                />
                                <input
                                    type="radio"
                                    value={star}
                                    name="rating"
                                    required
                                    className="opacity-0 h-px w-px absolute"
                                    onChange={() => setRating(star)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <InputPair
                    textArea
                    required
                    id="review"
                    name="review"
                    label="Review"
                    description="Maximum 1000 characters"
                    placeholder="Tell us more about your experience with this product"
                    maxLength={1000}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit">Submit review</Button>
                    </DialogClose>
                </DialogFooter>
            </Form>
        </DialogContent>
    );
}