import type { Route } from "./+types/profile-layout";
import { data, Form, Link, NavLink, Outlet, useOutletContext } from "react-router";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import { getProfileWithStatsByUsername } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ params }) => {
    return [{ title: `${params.username}'s profile | wemake` }];
};

export async function loader({ params, request }: Route.LoaderArgs) {
    const username = params.username?.trim();
    if (!username) throw data(null, { status: 404 });
    const { client } = makeSSRClient(request);
    const result = await getProfileWithStatsByUsername(client, username);
    if (!result) throw data(null, { status: 404 });

    console.log(result);
    return result;
}

function toRoleLabel(role: string) {
    const map: Record<string, string> = {
        developer: "Developer",
        designer: "Designer",
        marketer: "Marketer",
        founder: "Founder",
        "product-manager": "Product Manager",
    };
    return map[role] ?? role;
}

export default function ProfileLayout({ params, loaderData }: Route.ComponentProps) {

    const { isLoggedIn, username: loginUsername } = useOutletContext<{
        isLoggedIn: boolean;
        username?: string;
    }>();

    const { username } = params;
    const isMyProfile = isLoggedIn && loginUsername === username;

    const { profile, stats } = loaderData as Awaited<ReturnType<typeof loader>>;
    const fallback = (profile.name || profile.username).slice(0, 1).toUpperCase();

    return (
        <div className="space-y-10">
            <div className="flex items-center gap-4">
                <Avatar className="size-40">
                    <AvatarImage src={profile.avatar ?? undefined}/>
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <div className="space-y-5">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-2xl font-semibold">{profile.name}</h1>
                        {
                            isMyProfile ?
                                <Button variant="outline" asChild>
                                    <Link to="/my/settings">Edit profile</Link>
                                </Button>
                                : null
                        }
                        {
                            isMyProfile ?
                                null
                                : <>
                                    <Button variant="secondary">Follow</Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="secondary">Message</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Message</DialogTitle>
                                            </DialogHeader>
                                            <DialogDescription className="space-y-4">
                                        <span className="text-sm text-muted-foreground">
                                            Send a message to {profile.name}
                                        </span>
                                                <Form className="space-y-4">
                                                    <Textarea
                                                        placeholder="Message"
                                                        className="resize-none"
                                                        rows={4}
                                                    />
                                                    <Button type="submit">Send</Button>
                                                </Form>
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog></>
                        }
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="text-sm text-muted-foreground">@{profile.username}</span>
                        {profile.role ? (
                            <Badge variant={"secondary"}>{toRoleLabel(profile.role)}</Badge>
                        ) : null}
                        <Badge variant={"secondary"}>{stats.followers} followers</Badge>
                        <Badge variant={"secondary"}>{stats.following} following</Badge>
                    </div>
                </div>
            </div>
            <div className="flex gap-5">
                {[
                    { label: "About", to: `/users/${username}` },
                    { label: "Products", to: `/users/${username}/products` },
                    { label: "Posts", to: `/users/${username}/posts` },
                ].map((item) => (
                    <NavLink
                        end
                        key={item.label}
                        className={({ isActive }) =>
                            cn(
                                buttonVariants({ variant: "outline" }),
                                isActive && "bg-red-600 text-white hover:bg-red-600 hover:text-white"
                            )
                        }
                        to={item.to}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
            <div className="max-w-screen-md">
                <Outlet
                    context={{
                        headline: profile.headline,
                        bio: profile.bio,
                    }}
                />
            </div>
        </div>
    )
        ;
}