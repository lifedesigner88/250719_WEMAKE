import { Resend } from "resend";
import TestEmail from "@/react-email-starter/emails/test";

const client = new Resend(process.env.RESEND_API_KEY);

export const loader = async () => {
    console.log("email Sender");
    const { data, error } = await client.emails.send({
        from: 'Sejong <sejong@mail.sejongclass.kr>',
        to: 'lifedesigner88@gmail.com',
        subject: 'text Email :) ✅',
        react: <TestEmail username={"sejong"}/>
    })

    return Response.json({ data, error })
}