import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import helloRoute from "./routes/helloRoute";
import authRoutes from "./routes/authRoutes";
import getQuizRoute from "./routes/getQuizRoute";
import getQuizQrCodeRoute from "./routes/getQuizQrCodeRoute";
import quizzesRoute from "./routes/quizzesRoute";
import quizSaveRoute from "./routes/quizSaveRoute";
import quizDeleteRoute from "./routes/quizDeleteRoute";
import qrCodeImageRoute from "./routes/qrCodeImageRoute";
import savePlayerRoute from "./routes/savePlayerRoute";
import getScoreboard from "./routes/getScoreboard";


const app = express();
const port = process.env.PORT;
const clientUrl = process.env.CLIENT_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [clientUrl || "http://localhost:5173"],
  methods: ["GET", "POST"],
}));


app.use('/', helloRoute);

app.use('/auth', authRoutes);

app.use("/get-quiz", getQuizRoute);

app.use("/get-qr-quiz", getQuizQrCodeRoute);

app.use("/quizzes", quizzesRoute);

app.use("/save-quiz", quizSaveRoute);

app.use("/delete-quiz", quizDeleteRoute);

app.use("/qrcode", qrCodeImageRoute);

app.use("/save-player", savePlayerRoute);

app.use("/get-scoreboard", getScoreboard);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
