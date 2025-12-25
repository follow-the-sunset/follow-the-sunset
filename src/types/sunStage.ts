import type { SunStageEnum } from "./sunStageEnum";

export interface SunStage {
    name: SunStageEnum,
    ts: Date,
    valid: boolean
}
