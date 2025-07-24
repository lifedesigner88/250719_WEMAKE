import { Link, type MetaFunction } from "react-router";
import ProductCard from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import DiscussionCard from "~/features/community/components/discussion-card";

export const meta: MetaFunction = () => {
    return [
        {title:"Home | Wemake"},
        {name:"description", content:"Welcome to our wemake"},
    ]
}


export default function HomePage() {
    return (
        <div>
            {/*🔷 Products */}
            <div className="px-10 grid grid-cols-3 gap-4 mb-10">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">
                        Today's Promotions
                    </h2>
                    <p className="text-xl font-light">
                        The best products made by our community today.
                    </p>
                    <Button variant={"link"} className={"text-lg p-0"} asChild>
                        <Link to="/product/leaderboards">Explore all products &rarr;</Link>
                    </Button>
                </div>
                {Array.from({length:11}).map((_, i) => (
                    <ProductCard
                        productId={`productId-${i}`}
                        name={`ProductName-${i}`}
                        description="Product Description"
                        commentsCount={i}
                        viewsCount={12}
                        upvotes={120}
                    />
                ))}
            </div>

            {/*🔷 Latest Discussions*/}
            <div className="px-10 grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">
                        Latest Discussions
                    </h2>
                    <p className="text-xl font-light">
                        The latest discussions from out community.
                    </p>
                    <Button variant={"link"} className={"text-lg p-0"} asChild>
                        <Link to="/community">Explore all discussions &rarr;</Link>
                    </Button>
                </div>
                {Array.from({length:11}).map((_, i) => (
                    <DiscussionCard
                        postId="postId"
                        title="What is the best productivity tool?"
                        author="Nico"
                        category="Productivity"
                        timeAgo="12 hours ago"
                        avatarSrc="https://github.com/apple.png"
                        avatarFallback="N"
                    />
                ))}
            </div>
        </div>
    )
}