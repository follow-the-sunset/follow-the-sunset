import type { SunStage } from "./sunStage"

export interface LocatedSunInformation {
    // amateurDawn: SunStage,
    // amateurDusk: SunStage,
    astronomicalDawn: SunStage,
    astronomicalDusk: SunStage,
    // blueHourDawnEnd: SunStage,
    // blueHourDawnStart: SunStage,
    // blueHourDuskEnd: SunStage,
    // blueHourDuskStart: SunStage,
    civilDawn: SunStage,
    civilDusk: SunStage,
    goldenHourDawnEnd: SunStage,
    goldenHourDawnStart: SunStage,
    // goldenHourDuskEnd: SunStage,
    // goldenHourDuskStart: SunStage,
    nadir: SunStage,
    nauticalDawn: SunStage,
    nauticalDusk: SunStage,
    solarNoon: SunStage,
    sunriseEnd: SunStage,
    sunriseStart: SunStage,
    sunsetEnd: SunStage,
    sunsetStart: SunStage
}