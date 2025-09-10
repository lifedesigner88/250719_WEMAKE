import { OpenAI } from "openai";
import { insertIdeas } from "~/features/ideas/mutations";

const openai = new OpenAI()

export const loader = async () => {

    const completion = await openai.chat.completions.parse({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content:
                    "Give the name and elevator pitch of startup ideas that can be built by small teams.",
            },
            {
                role: "user",
                content:
                    "For example: 'An app that helps you find the best deals on groceries.', or 'A platform to rent a coder per hour.'",
            },
            {
                role: "user",
                content: "Give me 10 ideas. and description of each ideas length in 12 words.",
            },
        ],
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "startup_ideas",
                schema: {
                    type: "object",
                    properties: {
                        ideas: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                }
                            }
                        }
                    },
                    required: ["ideas"],
                    additionalProperties: false
                }
            }
        }

    })

// Description을 추출하고 정리하는 함수
    function extractDescriptions(response:any): string[] {
        const ideas = response.choices[0]?.message?.parsed?.ideas;

        if (!ideas) {
            return [];
        }

        return ideas.map((idea: { description: string; }) => {
            // 따옴표 제거 및 정리
            return idea.description
                .replace(/^"|"$/g, '') // 시작과 끝의 따옴표 제거
                .replace(/\\"/g, '"')  // 이스케이프된 따옴표 복원
                .trim();
        });
    }

    const descriptions = extractDescriptions(completion)

    await insertIdeas(descriptions);

    return Response.json({ ok: true });
}
