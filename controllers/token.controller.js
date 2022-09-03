import jwt from "jsonwebtoken";
import uuid4 from "uuid4";
import dotenv from 'dotenv';

dotenv.config();

export const getToken = (req, res, next) => { 
    var app_access_key = process.env.APP_ACCESS_KEY;
    var app_secret = process.env.APP_SECRET;

    var payload = {
        access_key: app_access_key,
        room_id: process.env.ROOM_ID,
        user_id: '<user_id>',
        role: 'host, guest',
        type: 'app',
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000)
    };

    jwt.sign(
        payload,
        app_secret,
        {
            algorithm: 'HS256',
            expiresIn: '24h',
            jwtid: uuid4()
        },
        function (err, token) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: err });
            }
            res.status(200).json({ token });
        }
    );

}