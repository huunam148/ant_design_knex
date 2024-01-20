import express from "express";
import dotenv from 'dotenv';
import routes from './routes/index.js';
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 63072000
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

