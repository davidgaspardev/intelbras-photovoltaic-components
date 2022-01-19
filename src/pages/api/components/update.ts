import { Component, ComponentGroup, SystemType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { isPostRequestValid, responseBadRequest, responseCreated, responseUnauthorized } from "../../../helpers/http";
import Sessions from "../../../lib/sessions";
import ComponentRepository from "../../../repository/component";
import UserRepository from "../../../repository/user";

const userRepo = new UserRepository();
const componentRepo = new ComponentRepository();

export default async function updateComponent(req: NextApiRequest, res: NextApiResponse) {
    if(!isPostRequestValid(req)) {
        responseBadRequest(res, "Request is valid (structure)");
        return;
    }

    const token = req.headers['token'] as string;
    const sessions = Sessions.getInstance();

    if(!sessions.hasSession(token)) {
        responseUnauthorized(res, "Token not allowed");
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

    await componentRepo.update(body.id, component);

    responseCreated(res);
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