import { getLoggedInUserId, getUserIdFromCookieSync, getUserIdFromSession } from "~/features/auth/querys";
import type { Route } from "../../+types/root";

export const loader = async ({ request }: Route.ActionArgs) => {

    // 성능 측정을 위한 함수들
    const functions = [
        { name: '쿠키에서 직접 가지고 옴', fn: () => getUserIdFromCookieSync(request) },
        { name: 'client.auth.getSession()', fn: () => getUserIdFromSession(request) },
        { name: 'client.auth.getUser()', fn: () => getLoggedInUserId(request) }
    ];

    // 결과를 저장할 객체
    const results: Record<string, number[]> = {
        '쿠키에서 직접 가지고 옴': [],
        'client.auth.getSession()': [],
        'client.auth.getUser()': []
    };

    // 10번 반복 실행
    for (let i = 0; i < 10; i++) {
        // 함수들을 랜덤 순서로 섞기
        const shuffledFunctions = [...functions].sort(() => Math.random() - 0.5);

        console.log(`\n=== Round ${i + 1} ===`);
        console.log(`Random order: ${shuffledFunctions.map(f => f.name).join(' -> ')}`);

        for (const { name, fn } of shuffledFunctions) {
            const startTime = performance.now();

            try {
                if (name === '쿠키에서 직접 가지고 옴') {
                    // 동기 함수
                    fn();
                } else {
                    // 비동기 함수
                    await fn();
                }
            } catch (error) {
                // 에러가 발생해도 시간 측정은 계속
                console.log(`${name} threw an error:`, error);
            }

            const endTime = performance.now();
            const executionTime = endTime - startTime;

            results[name].push(executionTime);
            console.log(`${name}: ${executionTime.toFixed(3)}ms`);
        }
    }

    // 평균 계산 및 결과 정리
    const averageResults = Object.entries(results).map(([name, times]) => {
        const average = times.reduce((sum, time) => sum + time, 0) / times.length;
        const min = Math.min(...times);
        const max = Math.max(...times);

        return {
            'Function': name,
            'Average (ms)': parseFloat(average.toFixed(3)),
            'Min (ms)': parseFloat(min.toFixed(3)),
            'Max (ms)': parseFloat(max.toFixed(3)),
            'Executions': times.length
        };
    });

    // console.table로 결과 출력
    console.log('\n=== Performance Results ===');
    console.table(averageResults);

    // 개별 실행 시간도 출력
    console.log('\n=== Individual Execution Times ===');
    const detailedResults = Object.entries(results).map(([name, times]) => ({
        'Function': name,
        'Run 1': `${times[0]?.toFixed(3)}ms`,
        'Run 2': `${times[1]?.toFixed(3)}ms`,
        'Run 3': `${times[2]?.toFixed(3)}ms`,
        'Run 4': `${times[3]?.toFixed(3)}ms`,
        'Run 5': `${times[4]?.toFixed(3)}ms`
    }));
    console.table(detailedResults);
}

export default function getUserIdTest() {
    return <h1>test</h1>
}