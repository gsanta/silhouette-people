import { PointerData } from "../services/input/PointerService";

export interface Tool {
    pointerMove(pointer: PointerData);
    pointerDown(pointer: PointerData);
    select(): void;
}