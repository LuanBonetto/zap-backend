import express from 'express';
import cors from 'cors';
import { createUserAccountEndpoint } from './user/createUserAccount';


const app = express();

app.use( cors ( { origin: true } ), express.json() );

app.post( '/user', createUserAccountEndpoint )

export default app
