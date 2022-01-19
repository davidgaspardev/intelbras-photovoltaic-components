import { NextApiRequest, NextApiResponse } from "next";
import Cubing from "../../lib/cubing";
import ComponentRepository from "../../repository/component";
import { CubingData } from "../../utils/types";

const componentRepo = new ComponentRepository();

export default async function cubagem(req: NextApiRequest, res: NextApiResponse<CubingData>) {
    if(!isRequestValid(req)) {
        res.status(400).end();
        return;
    }

    const { body } = req;
    const id = body["id"];
    const quantity = body["quantidade"];
    const component = await componentRepo.get({ id });

    if(!component) {
        res.status(400).end();
        return;
    }

    const cubing = new Cubing(component);

    res.status(200).json(cubing.calculateCubage(quantity));
}

function isRequestValid(req: NextApiRequest) {
    const { method } = req;

    if(!method || method !== "POST") return false;
    // if(headers['Content-Type'] !== 'application/json') return false;
    // if(!hasToken(req)) return false;
    if(!isRequestBodyValid(req)) return false;

    return true;
}

function isRequestBodyValid(req: NextApiRequest) {
    const { body } = req;

    const bodyKeys = Object.keys(body);
    if(bodyKeys.length !== 2) return false;
    if(!bodyKeys.includes("id") || !bodyKeys.includes("quantidade")) return false;
    if(typeof body["id"] !== "number" || typeof body["quantidade"] !== "number") return false;

    return true;
}

function isStringFloat(str: string) {
    const parsed = parseFloat(str);

    return !isNaN(parsed) && parsed.toString() === str;
}