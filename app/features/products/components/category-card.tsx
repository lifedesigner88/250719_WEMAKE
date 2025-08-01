import { Link } from "react-router";
import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChevronRightIcon } from "lucide-react";

interface CategoryCardProps {
    categoryId: string;
    name: string;
    description: string;
}

export default function CategoryCard({
    categoryId,
    name,
    description
}: CategoryCardProps) {
    return (
        <Link to={`/products/categories/${categoryId}`} className={"block"}>
            <Card>
                <CardHeader>
                    <CardTitle className={"flex gap-1"}>
                        {name}
                        <ChevronRightIcon className={"size-6"}/>
                    </CardTitle>
                    <CardDescription className={"text-base"}>
                        {description}
                    </CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
}