import * as express from "express";
import * as cors from 'cors';
import 'express-async-cors';
import {json} from "express";
import {handleError} from "./utils/error";

const app = express();

app.use(cors({
    origin: 'https://localhost:3000',
}));

app.use(json());


// app.get ('/', async (req, res) => {
//     throw new Error ('Daaamn!');
// })




app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('listening on http://localhost:3000')
});
