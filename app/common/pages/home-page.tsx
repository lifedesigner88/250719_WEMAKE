import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Home | Wemake" },
        { name: "description", content: "Welcome to our wemake" },
    ]
}


export default function HomePage() {
    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <h2 className="text-5xl font-bold leading-tight tracking-tight">
                    Today's Promotions
                </h2>
                <p className="text-xl font-light">

                </p>
            </div>
        </div>
    )
}