export default function confirmUserAnswers(userAnswers: boolean[], rightAnswers: boolean[]) {
    const resultList: (boolean | null)[] = [];
    let score = 0;

    userAnswers.map((ans, i) => {
        resultList.push(rightAnswers[i] ? rightAnswers[i] && ans : ans ? false : null)
        score = score + (rightAnswers[i] ? rightAnswers[i] && ans ? 1 : 0 : 0)
    })

    return {
        resultList,
        score
    };
}