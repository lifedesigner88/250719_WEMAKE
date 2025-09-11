import { Section, Row, Text, Column, Link, Img, Head, Preview, Html, Body, Tailwind } from "@react-email/components";

export default function TestEmail({ username }: { username: string }) {
    return (
        <Html>
            <Head/>
            <Preview>Welcome to our website!</Preview>
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Section className="my-[16px]">
                        <Section className="mt-[42px]">
                            <Row>
                                <Text className="m-0 font-semibold text-[16px] text-indigo-600 leading-[24px]">
                                    Our products
                                </Text>
                                <Text className="m-0 mt-[8px] font-semibold text-[24px] text-gray-900 leading-[32px]">
                                    Elegant Style {username}
                                </Text>
                                <Text className="mt-[8px] text-[16px] text-gray-500 leading-[24px]">
                                    We spent two years in development to bring you the next generation of
                                    our award-winning home brew grinder. From the finest pour-overs to the
                                    coarsest cold brews, your coffee will never be the same again.
                                </Text>
                            </Row>
                        </Section>
                        <Section className="mt-[16px]">
                            <Row className="mt-[16px]">
                                <Column className="w-[50%] pr-[8px]">
                                    <Link href="#">
                                        <Img
                                            alt="Stagg Electric Kettle"
                                            className="w-full rounded-[12px] object-cover"
                                            height={288}
                                            src="https://react.email/static/stagg-eletric-kettle.jpg"
                                        />
                                    </Link>
                                </Column>
                                <Column className="w-[50%] pl-[8px]">
                                    <Link href="#">
                                        <Img
                                            alt="Ode Grinder"
                                            className="w-full rounded-[12px] object-cover"
                                            height={288}
                                            src="https://react.email/static/ode-grinder.jpg"
                                        />
                                    </Link>
                                </Column>
                            </Row>
                            <Row className="mt-[16px]">
                                <Column className="w-[50%] pr-[8px]">
                                    <Link href="#">
                                        <Img
                                            alt="Atmos Vacuum Canister"
                                            className="w-full rounded-[12px] object-cover"
                                            height={288}
                                            src="https://react.email/static/atmos-vacuum-canister.jpg"
                                        />
                                    </Link>
                                </Column>
                                <Column className="w-[50%] pl-[8px]">
                                    <Link href="#">
                                        <Img
                                            alt="Clyde Electric Kettle"
                                            className="w-full rounded-[12px] object-cover"
                                            height={288}
                                            src="https://react.email/static/clyde-electric-kettle.jpg"
                                        />
                                    </Link>
                                </Column>
                            </Row>
                        </Section>
                    </Section>
                </Body>
            </Tailwind>
        </Html>

    )
}