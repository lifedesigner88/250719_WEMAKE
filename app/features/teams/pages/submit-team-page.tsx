import type { Route } from "./+types/submit-team-page";
import { Form, data, redirect } from "react-router";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import PageHeader from "~/common/components/page-header";
import { PRODUCT_STAGES } from "~/features/teams/constants";
import { createTeam } from "~/features/teams/queries";
import supabase from "~/supa-client";

export const meta: Route.MetaFunction = () => [
    { title: "Create Team | wemake" },
];

export const loader = async (_args: Route.LoaderArgs) => {
    // No dynamic data needed for now; keep for consistency with project conventions
    return {};
};

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();

    // 타입 검사. zod 로 대체 가능.
    const required = ["name", "stage", "size", "equity", "roles", "description"] as const;
    for (const key of required) {
        const v = formData.get(key);
        if (!v || typeof v !== "string" || v.trim().length === 0)
            throw data({ error: `${key} is required` }, { status: 400 });
    }

    const product_name = (formData.get("name") as string).trim();
    const product_stage = formData.get("stage") as string;
    const team_size = Number(formData.get("size"));
    const equity_split = Number(formData.get("equity"));
    const roles = (formData.get("roles") as string).trim();
    const product_description = (formData.get("description") as string).trim();

    if (!Number.isFinite(team_size) || team_size < 1 || team_size > 100)
        throw data({ error: "size must be a number between 1 and 100" }, { status: 400 });
    if (!Number.isFinite(equity_split) || equity_split < 1 || equity_split > 100)
        throw data({ error: "equity must be a number between 1 and 100" }, { status: 400 });

    // Temporary leader resolution: pick any existing profile as leader (no auth flow in repo)
    const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .select("profile_id")
        .limit(1)
        .single();
    if (profileError || !profileRow?.profile_id)
        throw data({ error: "No leader available" }, { status: 400 });

    const team = await createTeam({
        product_name,
        product_stage: product_stage as any,
        team_size,
        equity_split,
        roles,
        product_description,
        leader_id: profileRow.profile_id,
    } as any);

    return redirect(`/teams/${team.team_id}`);
};

export default function SubmitTeamPage() {
    return (
        <div className="space-y-20">
            <PageHeader title="Create Team" description="Create a team to find a team mate."/>
            <Form method="post" className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        label="What is the name of your product?"
                        description="(20 characters max)"
                        placeholder="i.e Doggy Social"
                        name="name"
                        maxLength={20}
                        type="text"
                        id="name"
                        required
                    />
                    <SelectPair
                        label="What is the stage of your product?"
                        description="Select the stage of your product"
                        name="stage"
                        required
                        placeholder="Select the stage of your product"
                        options={PRODUCT_STAGES}
                    />
                    <InputPair
                        label="What is the size of your team?"
                        description="(1-100)"
                        name="size"
                        max={100}
                        min={1}
                        type="number"
                        id="size"
                        required
                    />
                    <InputPair
                        label="How much equity are you willing to give?"
                        description="(each)"
                        name="equity"
                        max={100}
                        min={1}
                        type="number"
                        id="equity"
                        required
                    />
                    <InputPair
                        label="What roles are you looking for?"
                        placeholder="React Developer, Backend Developer, Product Manager"
                        description="(comma separated)"
                        name="roles"
                        type="text"
                        id="roles"
                        required
                    />
                    <InputPair
                        label="What is the description of your product?"
                        description="(200 characters max)"
                        placeholder="i.e We are building a new social media platform for dogs to connect with each other"
                        name="description"
                        maxLength={200}
                        type="text"
                        id="description"
                        required
                        textArea
                    />
                </div>
                <Button type="submit" className="w-full max-w-sm" size="lg">
                    Create team
                </Button>
            </Form>
        </div>
    );
}