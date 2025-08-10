import type { Route } from "./+types/home-page";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import ProductCard from "~/features/products/components/product-card";
import DiscussionCard from "~/features/community/components/discussion-card";
import IdeaCard from "~/features/ideas/components/idea-card";
import JobCard from "~/features/jobs/components/job-card";
import TeamCard from "~/features/teams/components/team-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Home | wemake" },
        { name: "description", content: "Welcome to wemake" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {

    const { client  } = makeSSRClient(request)

    const products = await getProductsByDateRange(client, {
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 8,
    })

    const posts = await getPosts(client, { limit: 11 });
    const gptIdeas = await getGptIdeas(client, { limit: 11 });
    const jobs = await getJobs(client, { limit: 11 });
    const teams = await getTeams(client, { limit: 11 });

    return { products, posts, gptIdeas, jobs, teams }
}

function csvToList(value: string) {
    return value.split(",").map((v) => v.trim()).filter(Boolean);
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            {/*🔷 Products ✅*/}
            <div className="px-10 grid grid-cols-3 gap-4 mb-10">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">
                        Today's Promotions
                    </h2>
                    <p className="text-xl font-light">
                        The best products made by our community today.
                    </p>
                    <Button variant={"link"} className={"text-lg p-0"} asChild>
                        <Link to="/products/leaderboards">Explore all products &rarr;</Link>
                    </Button>
                </div>
                {loaderData.products.map((p, i) => (
                    <ProductCard
                        key={i}
                        productId={p.product_id}
                        name={p.name}
                        description={p.tagline}
                        commentsCount={Number(p.reviews)}
                        viewsCount={Number(p.views)}
                        upvotes={Number(p.upvotes)}
                    />
                ))}
            </div>

            {/*🔷 Latest Discussions ✅*/}
            <div className="px-10 grid grid-cols-3 gap-4 mb-10">
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
                {loaderData.posts.map((post, index) => <DiscussionCard
                    key={index}
                    postId={post.postId}
                    title={post.title}
                    author={post.author}
                    avatarSrc={post.avatarSrc}
                    avatarFallback={post.author.slice(0, 2).toUpperCase()}
                    category={post.topics}
                    timeAgo={DateTime.fromISO(post.timeAgo).toRelative()!}
                    votesCount={post.voteCount}
                />)}
            </div>


            {/*🔷 GPT Ideas ✅ */}
            <div className="px-10 grid grid-cols-3 gap-4 mb-10">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">
                        IdeasGPT
                    </h2>
                    <p className="text-xl font-light">
                        Find ideas for your next project.
                    </p>
                    <Button variant={"link"} className={"text-lg p-0"} asChild>
                        <Link to="/ideas">Explore all ideas &rarr;</Link>
                    </Button>
                </div>
                {loaderData.gptIdeas.map((idea, i) => (
                    <IdeaCard
                        key={i}
                        ideaId={idea.gpt_idea_id}
                        title={idea.idea}
                        viewsCount={idea.views}
                        timeAgo={DateTime.fromISO(idea.created_at).toRelative()!}
                        likesCount={idea.likes}
                        claimed={idea.is_claimed}
                    />
                ))}
            </div>

            {/*🔷 Latest Jobs ✅*/}
            <div className="px-10 grid grid-cols-4 gap-4 mb-10">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">
                        Latest Jobs
                    </h2>
                    <p className="text-xl font-light">
                        Find Jobs for your next project.
                    </p>
                    <Button variant={"link"} className={"text-lg p-0"} asChild>
                        <Link to="/jobs">Explore all jobs &rarr;</Link>
                    </Button>
                </div>
                {loaderData.jobs.map((job) => (
                    <JobCard
                        key={job.job_id}
                        jobId={job.job_id}
                        companyName={job.company_name}
                        companyLogoSrc={job.company_logo_url}
                        companyHQ={job.company_location}
                        timeAgo={DateTime.fromISO(job.create_at).toRelative()!}
                        title={job.position}
                        positionLocation={job.job_location}
                        jobType={job.job_types}
                        salary={job.salary_range}
                    />
                ))}
            </div>

            {/*🔷 Team Card*/}
            <div className="px-10 grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">
                        Find a team mate
                    </h2>
                    <p className="text-xl font-light">
                        Join a team looking for a new member.
                    </p>
                    <Button variant={"link"} className={"text-lg p-0"} asChild>
                        <Link to="/teams">Explore all teams &rarr;</Link>
                    </Button>
                </div>

                {loaderData.teams.map((team) => (
                    <TeamCard
                        key={team.team_id}
                        teamId={team.team_id}
                        username={team.leader.username}
                        avatarSrc={`https://api.dicebear.com/7.x/shapes/svg?seed=${team.team_id}`}
                        avatarFallback={team.product_name.slice(0, 2).toUpperCase()}
                        roles={csvToList(team.roles)}
                        projectDescription={team.product_description}
                    />
                ))}

            </div>
        </div>
    )
}