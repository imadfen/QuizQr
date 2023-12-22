export type Answer = {
    label: string;
    isCorrect: boolean;
}

export type Question = {
    text: string;
    type: 'single' | 'multiple';
    answers: Answer[];
}

export type Theme = {
    id: string;
    name: string,
    text: string,
    background: string,
}

export type Quiz = {
    id: string;
    title: string;
    theme: Theme;
    questions: Question[];
    participantsCount: number;
}