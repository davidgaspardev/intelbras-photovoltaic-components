export type UserData = {
    username: string;
    password: string;
}

export type ComponentData = {
    id?: number;
    name: string;
    gtin: string;
    systemType: "ONGRID" | "OFFGRID";
    componentGroup: "PERFIL" | "MODULE" | "INVERSOR" | "CABOS" | "CONECTORES" | "BATERIAS";
    height: number;
    width: number;
    depth: number;
    weight: number;
    netWeight: number;
}

export type SearchParameters = {
    name: string;
    systemType?: "ONGRID" | "OFFGRID";
    componentGroup?: "PERFIL" | "MODULE" | "INVERSOR" | "CABOS" | "CONECTORES" | "BATERIAS";
};