import { NextApiRequest, NextApiResponse } from "next";
import { isGetRequestValid, responseBadRequest, responseOk, responseUnauthorized } from "../../../helpers/http";
import Sessions from "../../../lib/sessions";
import ComponentRepository from "../../../repository/component";
import { ComponentData } from "../../../utils/types";

type ResData = {
    components: ComponentData[];
}

const componentRepo = new ComponentRepository();

export default async function readComponents(req: NextApiRequest, res: NextApiResponse<ResData>) {
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

    const components = await componentRepo.getAll(
        Object.keys(req.query).length > 0 ? req.query : undefined
    );

    responseOk(res, {
        components: components.map<ComponentData>((component) => ({
            ...component,
            gtin: component.gtin.toString()
        }))
    });
}