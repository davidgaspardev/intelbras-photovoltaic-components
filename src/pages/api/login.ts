// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserRepository from '../../repository/user';
import { base64ToString } from '../../utils/convert';
import { UserData } from '../../utils/types';
import crypto from "crypto";
import Session from '../../lib/sessions';
import { textToMd5 } from '../../utils/hash';

const userRepository = new UserRepository();
const sessions = Session.getInstance();

type Data = {
  token: string
}

export default async function handlerLogin(req: NextApiRequest, res: NextApiResponse<Data | null>) {
    if(!isRequestValid(req)) {
        res.status(400);
        return;
    }

    const user = loadAuthorization(req.headers.authorization!);
    if(!(await isUserDataValid(user))) {
        res.status(401).send(null);
        return;
    }

    const token = textToMd5(`${user.username}:${user.password}:${Date.now()}`);
    sessions.createSession(user.username, token);

    res.status(200).json({ token });
}

function isRequestValid(req: NextApiRequest) {
    const { method } = req;

    if(!method || method !== "GET") return false;
    if(!hasRequestAuthorization(req)) return false;
    if(hasRequestQuery(req)) return false;

    return true;
}

function hasRequestQuery(req: NextApiRequest) {
    return Object.keys(req.query).length !== 0;
}

function hasRequestAuthorization(req: NextApiRequest) {
    return req.headers.authorization ? true : false;
}

function loadAuthorization(auth: string): UserData {
    const authBase64 = getBase64FromAuthrozation(auth);
    const userAndPass = base64ToString(authBase64).split(":");

    return {
        username: userAndPass[0],
        password: userAndPass[1]
    }
}

function getBase64FromAuthrozation(auth: string) {
    return auth.split(" ")[1];
}

async function isUserDataValid(data: UserData) {
    data.password = crypto.createHash('md5')
        .update(data.password)
        .digest('hex');

    const user = await userRepository.get(data);

    if(!user) return false;

    return true;
}