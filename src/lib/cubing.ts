import { Component } from "@prisma/client";
import { CubingData } from "../utils/types";

export default class Cubing {
    private readonly component: Component;

    constructor(componet: Component) {
        this.component = componet;
        this.getCubeVolume = this.getCubeVolume.bind(this);
    }

    private getCubeVolume() {
        const { component } = this;

        return component.width * component.height * component.depth;
    }

    public calculateCubage(quantity: number = 1): CubingData {
        const { getCubeVolume, component } = this;

        return {
            cubagem: getCubeVolume() * quantity,
            pesoBruto: component.weight * quantity,
            pesoLiquido: component.netWeight * quantity
        }
    }
}