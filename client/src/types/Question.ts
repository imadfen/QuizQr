export type Answer = {
    label: string;
    isCorrect: boolean;
}

export type Question = {
    text: string;
    type: 'single' | 'multiple';
    answers: Answer[];
}