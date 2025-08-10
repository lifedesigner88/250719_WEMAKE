import type { Route } from "./+types/profile-posts-page";
import DiscussionCard from "~/features/community/components/discussion-card";
import { z } from "zod";
import { getUserPosts } from "~/features/users/queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
    return [{ title: "Posts | wemake" }];
};

export const loader = async ({ params }: Route.LoaderArgs) => {

    const userParamsSchema = z.object({ username: z.string(), });
    const result = userParamsSchema.safeParse(params);

    if (!result.success) {
        console.warn("Invalid user ID params:", result.error?.issues ?? result);
        throw data(
            { error_code: "invalid_params", message: "Invalid user ID" },
            { status: 400 }
        );
    }

    const posts = await getUserPosts(result.data.username);
    return { posts }
}

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
    const { posts } = loaderData;

    return (
        <div className="flex flex-col gap-5">
            {posts.map((p, index) => (
                <DiscussionCard
                    key={`postId-${index}`}
                    postId={p.postId}
                    title={p.title}
                    author={p.author}
                    avatarSrc={p.avatarSrc}
                    avatarFallback={p.author.slice(0, 2).toUpperCase()}
                    category={p.topics}
                    timeAgo={DateTime.fromISO(p.timeAgo).toRelative()}
                    votesCount={p.votesCount}
                />
            ))}
        </div>
    );
}