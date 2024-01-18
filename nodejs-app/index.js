import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import routes from './routes/appRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:`+ port);
});

