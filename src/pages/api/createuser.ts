// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import UserRepository from '../../repository/user';
import crypto from 'crypto';
import { User } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userRepo = new UserRepository();

    req.query['password'] = crypto.createHash('md5')
        .update(req.query['password'] as string)
        .digest('hex');

    await userRepo.add(req.query as unknown as User);

    res.status(200).send("User created");
}