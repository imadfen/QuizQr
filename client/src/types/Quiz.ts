import { Question } from "./Question";

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