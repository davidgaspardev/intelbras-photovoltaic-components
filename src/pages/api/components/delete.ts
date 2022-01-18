import { NextApiRequest, NextApiResponse } from "next";
import Sessions from "../../../lib/sessions";
import ComponentRepository from "../../../repository/component";

const componentRepo = new ComponentRepository();

export default async function deleteComponent(req: NextApiRequest, res: NextApiResponse) {
    if(!isRequestValid(req)) {
        res.status(400).end();
        return;
    }

    const token = req.headers['token'] as string;
    const sessions = Sessions.getInstance();

    if(!sessions.hasSession(token)) {
        res.status(401).end();
        return;
    }

    const { id } = req.query;

    await componentRepo.delete(Number.parseInt(id as string));

    res.status(200).end();
}

function isRequestValid(req: NextApiRequest) {
    const { method, headers } = req;

    if(!method || method !== "GET") return false;
    // if(headers['Content-Type'] !== 'application/json') return false;
    if(!hasToken(req)) return false;

    return true;
}

function hasToken(req: NextApiRequest) {
    return typeof req.headers['token'] === "string" && req.headers['token'] ? true : false;
}