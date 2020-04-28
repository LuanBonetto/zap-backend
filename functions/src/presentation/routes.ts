import express from 'express';
import cors from 'cors';
import { createUserAccountEndpoint } from './user/createUserAccount';
import { loginEndpoint } from './user/login';
import { redefinePasswordEndpoint } from './user/redefinePassword';
import { sendMessageEndpoint } from './message/sendMessage';


const app = express();

app.use( cors ( { origin: true } ), express.json() );

app.post( '/user/signup', createUserAccountEndpoint )
app.post( '/user/login', loginEndpoint )
app.put( '/user/redefinePassword', redefinePasswordEndpoint )
app.post( '/message/send', sendMessageEndpoint )

export default app
