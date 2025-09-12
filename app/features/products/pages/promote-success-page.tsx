import z from "zod"
import type { Route } from "./+types/promote-success-page"
import type { TossPaymentResponse } from "~/features/products/TossReturnType";

const paramsSchema = z.object({
    paymentType: z.string(),
    orderId: z.string().uuid(),
    paymentKey: z.string(),
    amount: z.coerce.number(),
})

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const { success, data } = paramsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!success) return new Response(null, { status: 400 })

    const encryptedSecretKey = `Basic ${Buffer.from(TOSS_SECRET_KEY + ":").toString("base64")}`;

    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST",
        headers: {
            "Authorization": encryptedSecretKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            orderId: data.orderId,
            paymentKey: data.paymentKey,
            amount: data.amount,
        })
    })

    const responseData: TossPaymentResponse = await response.json();

    return { responseData }
}


export default function PromoteSuccessPage({ loaderData }: Route.ComponentProps) {
    const { responseData } = loaderData;
    return (
        <div className="flex flex-col items-center p-10 gap-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">결제가 완료되었습니다</h1>
                <p className="text-gray-500">주문하신 내역은 아래와 같습니다</p>
            </div>

            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">주문명</span>
                        <span className="font-medium">{responseData.orderName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">결제 방법</span>
                        <span className="font-medium">{responseData.easyPay?.provider}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">결제 금액</span>
                        <span className="font-medium">{responseData.totalAmount?.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">결제 일시</span>
                        <span className="font-medium">{new Date(responseData.approvedAt)?.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <a href="/dashboard" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                    대시보드로 이동
                </a>
                <a href={responseData.receipt.url} target="_blank"
                   className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    영수증 보기
                </a>
            </div>
        </div>
    )
}
