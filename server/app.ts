import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import helloRoute from "./routes/helloRoute";
import authRoutes from "./routes/authRoutes";
import quizzesRoute from "./routes/quizzesRoute";
import quizSaveRoute from "./routes/quizSaveRoute";
import quizDeleteRoute from "./routes/quizDeleteRoute";
import qrCodeImageRoute from "./routes/qrCodeImageRoute";


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clientUrl = process.env.CLIENT_URL
app.use(cors({
  origin: [clientUrl || "http://localhost:5173"],
  methods: ["GET", "POST"],
}));


app.use('/', helloRoute);

app.use('/auth', authRoutes);

app.use("/quizzes", quizzesRoute);

app.use("/save-quiz", quizSaveRoute);

app.use("/delete-quiz", quizDeleteRoute);

app.use("/qrcode", qrCodeImageRoute);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
