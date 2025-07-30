import { Link } from "react-router";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { renderStatItem } from "~/common/components/common-utils";

interface ProductCardProps {
    productId: string;
    name: string;
    description: string;
    commentsCount: number;
    viewsCount: number;
    upvotes: number;
}

export default function ProductCard({
                                        productId,
                                        name,
                                        description,
                                        commentsCount,
                                        viewsCount,
                                        upvotes
                                    }: ProductCardProps) {
    return (
        <Link to={`/products/${productId}`} className={"block"}>
            <Card className="flex-row justify-between bg-transparent hover:bg-card/50">
                <CardHeader className="w-3/4">
                    <CardTitle>
                        {name}
                    </CardTitle>
                    <CardDescription>{description}</CardDescription>
                    <div className="flex items-center gap-4">
                        {renderStatItem(MessageCircleIcon, commentsCount)}
                        {renderStatItem(EyeIcon, viewsCount)}
                    </div>
                </CardHeader>
                <CardFooter className="py-0">
                    <Button variant="outline" className="flex flex-col h-14">
                        <ChevronUpIcon className="size-4 shrink-0"/>
                        <span>{upvotes}</span>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
