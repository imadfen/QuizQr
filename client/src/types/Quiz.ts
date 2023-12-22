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
    qrCodeName: string;
    isPublished: boolean;
    questions: Question[];
    participantsCount: number;
}