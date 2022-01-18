import { Component } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Sessions from "../../../lib/sessions";
import ComponentRepository from "../../../repository/component";
import { ComponentData } from "../../../utils/types";

type ResData = {
    components: ComponentData[];
}

const componentRepo = new ComponentRepository();

export default async function readComponents(req: NextApiRequest, res: NextApiResponse<ResData>) {
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

    const components = await componentRepo.getAll(
        Object.keys(req.query).length > 0 ? req.query : undefined
    );

    res.status(200).json({
        components: components.map<ComponentData>((component) => ({
            ...component,
            gtin: component.gtin.toString()
        }))
    });
}

function isRequestValid(req: NextApiRequest) {
    const { method } = req;

    if(!method || method !== "GET") return false;
    if(!hasToken(req)) return false;

    return true;
}

function hasToken(req: NextApiRequest) {
    return typeof req.headers['token'] === "string" && req.headers['token'] ? true : false;
}