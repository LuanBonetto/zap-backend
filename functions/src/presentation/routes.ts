import express from 'express';
import cors from 'cors';
import { createUserAccountEndpoint } from './user/createUserAccount';
import { loginEndpoint } from './user/login';
import { redefinePasswordEndpoint } from './user/redefinePassword';
import { sendMessageEndpoint } from './message/sendMessage';
import { sendFriendRequestEndpoint } from './user/sendFriendRequest';
import { getFriendRequestListEndpoint } from './user/getFriendRequestList';


const app = express();

app.use( cors ( { origin: true } ), express.json() );

app.post( '/user/signup', createUserAccountEndpoint )
app.post( '/user/login', loginEndpoint )
app.put( '/user/redefinePassword', redefinePasswordEndpoint )
app.post( '/message/send', sendMessageEndpoint )
app.post( '/user/sendFriendRequest', sendFriendRequestEndpoint )
app.get( '/user/getFriendRequestList', getFriendRequestListEndpoint )

export default app
