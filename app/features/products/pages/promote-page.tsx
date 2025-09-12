import type { Route } from "./+types/promote-page";
import PageHeader from "~/common/components/page-header";
import type { DateRange } from "react-day-picker";
import React, { useRef } from "react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Calendar } from "~/common/components/ui/calendar";
import { Button } from "~/common/components/ui/button";
import { getProductForPromote } from "~/features/products/queries";
import { getUserIdForSever } from "~/features/auth/querys";
import { loadTossPayments, type TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "promote | wemake" },
        { name: "discription", content: "Promote your product" }
    ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const userId = await getUserIdForSever(request)
    const data = await getProductForPromote(userId)
    return { data, userId }
}

export const action = async ({ request }: Route.ActionArgs) => {

    const formData = await request.formData();
    const object = Object.fromEntries(formData);
    console.log(object)

}

export default function PromotePage({ loaderData }: Route.ComponentProps) {
    const { data, userId } = loaderData;

    const [promotionPeriod, setPromotionPeriod] = React.useState<DateRange | undefined>();

    const totalDays = promotionPeriod?.from && promotionPeriod?.to ?
        DateTime.fromJSDate(promotionPeriod.to).diff(
            DateTime.fromJSDate(promotionPeriod.from), "days").days + 1 : 0;


    const widgets = useRef<TossPaymentsWidgets>(null);

    // 토스 페이먼츠 로딩
    useEffect(() => {
        const initToss = async () => {
            const toss = await loadTossPayments("test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm")
            widgets.current = toss.widgets({
                customerKey: userId
            })

            await widgets.current.setAmount({
                value: 0,
                currency: "KRW"
            })

            await widgets.current.renderPaymentMethods({
                selector: "#toss-payment-methods",
            })

            await widgets.current.renderAgreement({
                selector: "#toss-payment-agreement",
            })
        };
        void initToss();
    }, []);

    // 가격 세팅
    useEffect(() => {
            if (widgets.current) {
                void widgets.current.setAmount({
                    value: totalDays * 20000,
                    currency: "KRW"
                })
            }
        },
        [promotionPeriod])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const product_id = formData.get("product_id") as string;
        const startDate = promotionPeriod?.from?.toISOString() ?? "";
        const endDate = promotionPeriod?.to?.toISOString() ?? "";
        console.log(product_id, startDate, endDate)
        if (!product_id || !startDate || !endDate) return;
        await widgets.current?.requestPayment({
            orderId: crypto.randomUUID(),
            orderName: "wemake product promotion",
            customerEmail: "lifedesigner88@gmail.com",
            customerName: "sejongPark",
            metadata:{
                product_id: product_id,
                start_date: startDate,
                end_date: endDate,
                total_days: totalDays,
            },
            successUrl: `${window.location.href}/success`,
            failUrl: `${window.location.href}/fail`,
            }
        )
    }


    return (
        <div className={"flex flex-col items-center"}>
            <PageHeader title={"Promote Your Product"} description={"Boost your product's visibility "}/>
            <form onSubmit={handleSubmit} className={"px-20 grid grid-cols-6 w-full"} method={"post"}>
                <div className={"col-span-4 w-full  flex flex-col gap-10 items-center"}>
                    <SelectPair
                        label={"Select a Product"}
                        description={"Select a product to promote"}
                        name={"product_id"}
                        required={true}
                        placeholder={"Select a product"}
                        options={data?.map((product) => ({
                                label: product.name,
                                value: `${product.product_id}`,
                            })
                        )}/>
                    <div>
                        <Label className={"flex flex-col gap-1"}>
                            Seletet a range of dates for prometion{""}
                            <small className={"text-muted-foreground"}>
                                Minimum duration is 3 days.
                            </small>
                        </Label>
                        <Calendar
                            mode={"range"}
                            selected={promotionPeriod}
                            onSelect={setPromotionPeriod}
                            min={3}
                            disabled={{ before: new Date() }}
                        />
                    </div>

                </div>
                <aside className={"col-span-2 flex flex-col gap-10 items-center min-w-[400px]"}>
                    <div id={"toss-payment-methods"} className={"w-full"}></div>
                    <div id={"toss-payment-agreement"} className={"w-full"}></div>
                    <Button disabled={totalDays === 0} type={"submit"} className={"w-full"}>
                        Go to checkout ( {(totalDays * 20000).toLocaleString("ko-KR", {
                        style: "currency",
                        currency: "KRW"
                    })} )
                    </Button>
                </aside>

            </form>


        </div>
    );


}