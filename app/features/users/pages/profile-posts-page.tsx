
import type { Route } from "./+types/profile-posts-page";
import DiscussionCard from "~/features/community/components/discussion-card";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Posts | wemake" }];
};

export default function ProfilePostsPage({ params }: Route.ComponentProps) {
    return (
        <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <DiscussionCard
                    key={`postId-${index}`}
                    postId={index}
                    title="What is the best productivity tool?"
                    author="Nico"
                    avatarSrc="https://github.com/apple.png"
                    avatarFallback={"AA"}
                    category="Productivity"
                    timeAgo="12 hours ago"
                    expanded
                    votesCount={index}
                />
            ))}
        </div>
    );
}