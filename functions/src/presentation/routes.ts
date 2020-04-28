import express from 'express';
import cors from 'cors';
import { createUserAccountEndpoint } from './user/createUserAccount';
import { loginEndpoint } from './user/login';


const app = express();

app.use( cors ( { origin: true } ), express.json() );

app.post( '/user/signup', createUserAccountEndpoint )
app.post( '/user/login', loginEndpoint )

export default app
