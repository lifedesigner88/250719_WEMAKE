import { Link, type MetaFunction } from "react-router";
import ProductCard from "~/features/products/components/product-card";
import { Button } from "~/common/components/ui/button";
import DiscussionCard from "~/features/community/components/discussion-card";
import IdeaCard from "~/features/ideas/components/idea-card";
import JobCard from "~/features/jobs/components/job-card";
import TeamCard from "~/features/teams/components/team-card";


export const meta: MetaFunction = () => {
    return [
        {title:"Home | wemake"},
        {name:"description", content:"Welcome to wemake"},
    ];
};

export default function HomePage() {
    return (
        <div>
            {/*🔷 Products */}
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

            {/*🔷 Latest Discussions*/}
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
                {Array.from({length:5}).map((_, i) => (
                    <IdeaCard
                        ideaId="ideaId"
                        title="A revolutionary AI-powered personal wellness platform that combines cutting-edge machine
learning with personalized fitness coaching. Our mobile app delivers real-time workout
guidance, adaptive training programs, and comprehensive progress tracking. Using computer
vision and biometric data analysis, we provide instant form corrections, injury prevention
tips, and dynamic workout adjustments based on individual performance and goals. The
platform includes nutrition planning, recovery optimization, and social features for
community motivation, creating a complete ecosystem for achieving and maintaining peak
physical fitness."
                        viewsCount={123}
                        timeAgo="12 hours ago"
                        likesCount={12}
                        claimed={i % 2 === 0}
                    />
                ))}
            </div>

            {/*🔷 Latest Jobs*/}
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
                {Array.from({length:11}).map((_, i) => (
                    <JobCard
                        jobId={i}
                        companyName="Facebook"
                        companyLogoSrc="https://github.com/facebook.png"
                        companyHQ="SanFrancisco, CA"
                        timeAgo="12 hours ago"
                        title="Software Engineer"
                        positionLocation="Remote"
                        jobType="Full Time"
                        salary="$100,000 - $120,000"
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

                {Array.from({length:5}).map((_, i) => (
                    <TeamCard
                        teamId="teamId"
                        username="lynn"
                        avatarSrc="https://github.com/inthetiger.png"
                        avatarFallback="N"
                        roles={["React Developer", "Backend Developer", "Product Manager"]}
                        projectDescription="a new social media platform"
                    />
                ))}

            </div>
        </div>
    )
}