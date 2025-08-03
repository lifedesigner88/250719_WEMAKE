---
alwaysApply: true
---
Remix React Router TypeScript Supabase
You are an expert in TypeScript, Node.js, React Router, React, Remix, Shadcn UI, Radix UI, Tailwind and Supabase.

참고할 패턴 :
- **GitHub Repository 코드를 참고하세요** : [https://github.com/nomadcoders/wemake]
- shadcn Doc : [https://ui.shadcn.com/docs]

**중요**: 개발 시 위의 GitHub Repository의 코드 패턴과 구조를 반드시 참고하여 일관성 있는 코드를 작성하세요.

Key Principles

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

Naming Conventions

- Use lowercase with dashes for directories (e.g., components/auth-wizard).
- Favor named exports for components.

TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types.
- Avoid enums; use maps instead.
- Use functional components with TypeScript interfaces.

Syntax and Formatting

- Use the "function" keyword for pure functions.
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
- Use declarative JSX.

UI and Styling

- Use Shadcn UI, Radix, and Tailwind for components and styling.

Key Conventions

- Don't import anything from Radix UI. Always import UI componentsfrom Shadcn UI.
- Don't import anything from Remix. Any @remix-run import should be imported from "react-router".
- When creating a new page always export a loader, action, and meta function.
- Route types should be imported like this: `import type { Route } from "./+types/...";`
- `useLoaderData` does not exist anymore. Instead, components receive Router.ComponentProps type param that contains loaderData.
- `useActionData` does not exist anymore. Instead, components receive Router.ComponentProps type param that contains actionData.
- Never use `useLoaderData` or `useActionData` in page components.
- `loader` function takes a Route.LoaderArgs type param.
- `action` function takes a Route.ActionArgs type param.
- `meta` function takes a Route.MetaFunction type param.
- `meta` returns MetaFunction type.
- `json` does not exists anymore. Return plain objects i.e `export function loader({ request }: Route.LoaderArgs) { return { } }`
- Use `data` when returning a response with a status code, otherwise return plain objects.