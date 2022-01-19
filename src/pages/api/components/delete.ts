import { NextApiRequest, NextApiResponse } from "next";
import { isGetRequestValid, responseBadRequest, responseOk, responseUnauthorized } from "../../../helpers/http";
import Sessions from "../../../lib/sessions";
import ComponentRepository from "../../../repository/component";

const componentRepo = new ComponentRepository();

export default async function deleteComponent(req: NextApiRequest, res: NextApiResponse) {
    if(!isGetRequestValid(req)) {
        responseBadRequest(res, "Request is valid (structure)");
        return;
    }

    const token = req.headers['token'] as string;
    const sessions = Sessions.getInstance();

    if(!sessions.hasSession(token)) {
        responseUnauthorized(res, "Token not allowed");
        return;
    }

    const { id } = req.query;

    await componentRepo.delete(Number.parseInt(id as string));

    responseOk(res);
}