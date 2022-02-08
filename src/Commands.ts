import { Command } from "./Command";
import { AddEntrance } from "./commands/AddEntrance";
import { RemoveEntrance } from "./commands/RemoveEntrance";
import { SetChamp } from "./commands/SetChampRole";

export const Commands: Command[] = [AddEntrance, RemoveEntrance, SetChamp]; 