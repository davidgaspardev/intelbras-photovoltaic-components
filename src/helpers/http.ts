import { NextApiRequest, NextApiResponse } from "next";
import { isTextMd5 } from "../utils/hash";

// Methods
const GET = 'GET';
const POST = 'POST';

// Header property names
const TOKEN = 'token';
const CONTENT_LENGTH = 'content-length';
const CONTENT_TYPE = 'content-type';

// Header property values
const APPLICATION_JSON = 'application/json';

// Status codes
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

/** ========================= HTTP REQUEST ========================= */

export function isGetRequestValid(req: NextApiRequest) {
    const { method } = req;

    if(!method || method !== GET) return false;
    if(!hasRequestToken(req)) return false;

    return true;
}

export function isPostRequestValid(req: NextApiRequest) {
    const { method } = req;

    if(!method || method !== POST) return false;
    // if(!isRequestApplicationJson(req)) return false;
    if(!hasRequestToken(req)) return false;

    return true;
}

export function isRequestApplicationJson(req: NextApiRequest) {
    if(req.headers[CONTENT_TYPE] && typeof req.headers[CONTENT_TYPE] === "string") {
        return req.headers[CONTENT_TYPE] === APPLICATION_JSON;
    }
    return false;
}

export function hasRequestToken(req: NextApiRequest) {
    if(req.headers[TOKEN] && typeof req.headers[TOKEN] === "string") {
        return isTextMd5(req.headers[TOKEN] as string);
    }
    return false;
}

/** ========================= HTTP RESPONSES ========================= */

export function responseOk(res: NextApiResponse, content?: Object | string) {
    res.status(OK);

    _sendResponse(res, content);
}

export function responseCreated(res: NextApiResponse, content?: Object | string) {
    res.status(CREATED);

    _sendResponse(res, content);
}

export function responseNoContent(res: NextApiResponse) {
    res.status(NO_CONTENT);

    _sendResponse(res);
}

export function responseUnauthorized(res: NextApiResponse, message?: string) {
    res.status(UNAUTHORIZED);

    _sendResponse(res, message && {
        message
    });
}

export function responseBadRequest(res: NextApiResponse, message?: string) {
    res.status(BAD_REQUEST);

    _sendResponse(res, message && {
        message
    });
}

export function responseInternalServerError(res: NextApiResponse, message?: string) {
    res.status(INTERNAL_SERVER_ERROR);

    _sendResponse(res, message && {
        message
    });
}

function _sendResponse(res: NextApiResponse, content?: Object | string) {
    switch(typeof content) {
        case "object":
            res.setHeader(CONTENT_LENGTH, JSON.stringify(content).length);
            return res.json(content);
        case "string":
            res.setHeader(CONTENT_LENGTH, content.length);
            return res.send(content);
        default:
            res.end();
    }
}