import { IFighter } from "./IFighter";

export interface IFight {
    fighter1: IFighter;
    fighter2: IFighter;
    initiatedAt: Date;
}