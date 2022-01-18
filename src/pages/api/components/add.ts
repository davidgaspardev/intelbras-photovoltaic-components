import { Component, ComponentGroup, SystemType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Sessions from "../../../lib/sessions";
import ComponentRepository from "../../../repository/component";
import UserRepository from "../../../repository/user";

const userRepo = new UserRepository();
const componentRepo = new ComponentRepository();

export default async function addComponent(req: NextApiRequest, res: NextApiResponse) {
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

    const username = sessions.findUsernameByToken(token);
    const { body } = req;

    const component = {
        ...body,
        gtin: BigInt(body['gtin']),
        systemType: getSystemTypeByString(body['systemType']),
        componentGroup: getComponentGroupByString(body['componentGroup'])
    } as Component;
    
    component.createById = (await userRepo.get({ username }))!.id;

    await componentRepo.add(component);

    res.status(201).end();
}

function getSystemTypeByString(str: "ONGRID" | "OFFGRID") {
    switch(str) {
        case "ONGRID": return SystemType.ONGRID;
        case "OFFGRID": return SystemType.OFFGRID;
    }
}

function getComponentGroupByString(str: "PERFIL" | "MODULE" | "INVERSOR" | "CABOS" | "CONECTORES" | "BATERIAS") {
    switch(str) {
        case "PERFIL": return ComponentGroup.PERFIL;
        case "MODULE":  return ComponentGroup.MODULE;
        case "INVERSOR": return ComponentGroup.INVERSOR;
        case "CABOS": return ComponentGroup.CABOS;
        case "CONECTORES": return ComponentGroup.CONECTORES;
        case "BATERIAS": return ComponentGroup.BATERIAS;
    }
}

function isRequestValid(req: NextApiRequest) {
    const { method, headers } = req;

    if(!method || method !== "POST") return false;
    // if(headers['Content-Type'] !== 'application/json') return false;
    if(!hasToken(req)) return false;

    return true;
}

function hasToken(req: NextApiRequest) {
    return typeof req.headers['token'] === "string" && req.headers['token'] ? true : false;
}