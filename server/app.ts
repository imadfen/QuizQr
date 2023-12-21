import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import helloRoute from "./routes/helloRoute"
import authRoutes from "./routes/authRoutes"


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


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
