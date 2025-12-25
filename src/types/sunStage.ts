import type { SunStageEnum } from "./sunStageEnum";

export interface SunStage {
    elevation: number,
    julian: number,
    name: SunStageEnum,
    pos: number,
    ts: number,
    valid: boolean
}
