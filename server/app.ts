import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import helloRoute from "./routes/helloRoute";
import authRoutes from "./routes/authRoutes";
import quizzesRoute from "./routes/quizzesRoute";
import quizSaveRoute from "./routes/quizSaveRoute";
import quizDeleteRoute from "./routes/quizDeleteRoute";


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
}));


app.use('/', helloRoute);

app.use('/auth', authRoutes);

app.use("/quizzes", quizzesRoute);

app.use("/save-quiz", quizSaveRoute);

app.use("/delete-quiz", quizDeleteRoute);


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
