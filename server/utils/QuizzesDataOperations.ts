import * as fs from 'fs';
import * as path from 'path';
import { Quiz } from '../types/Quiz';
import createQrCode from './createQrCode';
import deleteQrCode from './deleteQrCode';

const filePath = path.join(__dirname, "..", "data", "quizzes.json");


export function readQuizzesData() {
  const data = fs.readFileSync(filePath, 'utf-8');
  const QuizzesData: Quiz[] = JSON.parse(data);

  return QuizzesData;
}

export function addToQuizzesData(quiz: Quiz) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const quizzesData: Quiz[] = JSON.parse(data);

  const existingQuizIndex = quizzesData.findIndex(quizData => quizData.id === quiz.id)

  if (existingQuizIndex !== -1) {
    quizzesData[existingQuizIndex] = quiz;
  } else {
    quizzesData.push(quiz);
    createQrCode(quiz.id, quiz.qrCodeName);
  }

  const updatedData = JSON.stringify(quizzesData, null, 4);

  fs.writeFileSync(filePath, updatedData, 'utf-8');
}

export function deleteFromQuizzesData(quizId: string) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const quizzesData: Quiz[] = JSON.parse(data);

  const existingQuizIndex = quizzesData.findIndex(quizData => quizData.id === quizId)

  if (existingQuizIndex > -1) {
    const qrCodeFileName = quizzesData[existingQuizIndex].qrCodeName;

    quizzesData.splice(existingQuizIndex, 1);
    const updatedData = JSON.stringify(quizzesData, null, 4);

    deleteQrCode(qrCodeFileName);
    fs.writeFileSync(filePath, updatedData, 'utf-8');
  }
}