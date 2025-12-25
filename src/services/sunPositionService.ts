import type { LocatedSunInformation } from '@/types/locatedSunInformation';
import { SunStageEnum } from '@/types/sunStageEnum';
import dayjs from 'dayjs';
import * as SunCalc from 'suncalc-ts';

export const sunPositionService = () => {
    const getSunPosition = (latitude: number, longitude: number, date: Date) => {
        return SunCalc.getPosition(date, latitude, longitude);
    }

    const getDailySunPositions = (latitude: number, longitude: number, date: Date) => {
        return Array.from({ length: 48 }, (_, i) => {
            const time = dayjs().startOf('day').add(i * 30, 'minute').toDate();
            const pos = getSunPosition(latitude, longitude, time);
            return {
                time: time,
                sunPosition: {
                    altitude: pos.altitude,
                    azimuth: pos.azimuth,
                    altitudeDegrees: pos.altitude * (180 / Math.PI)
                }
            }
        });
    }

    const getSunPositionInformation = (latitude: number, longitude: number, date: Date): LocatedSunInformation => {
        const getTimes = SunCalc.getTimes(date, latitude, longitude);
        return {
            solarNoon: { ts: getTimes.solarNoon, name: SunStageEnum.solarNoon, valid: dayjs(getTimes.solarNoon).isValid() },
            nadir: { ts: getTimes.nadir, name: SunStageEnum.nadir, valid: dayjs(getTimes.nadir).isValid() },
            sunriseEnd: { ts: getTimes.sunriseEnd, name: SunStageEnum.sunriseEnd, valid: dayjs(getTimes.sunriseEnd).isValid() },
            sunriseStart: { ts: getTimes.sunrise, name: SunStageEnum.sunriseStart, valid: dayjs(getTimes.sunrise).isValid() },
            sunsetEnd: { ts: getTimes.sunset, name: SunStageEnum.sunsetEnd, valid: dayjs(getTimes.sunset).isValid() },
            sunsetStart: { ts: getTimes.sunsetStart, name: SunStageEnum.sunsetStart, valid: dayjs(getTimes.sunsetStart).isValid() },
            civilDawn: { ts: getTimes.dawn, name: SunStageEnum.civilDawn, valid: dayjs(getTimes.dawn).isValid() },
            civilDusk: { ts: getTimes.dusk, name: SunStageEnum.civilDusk, valid: dayjs(getTimes.dusk).isValid() },
            nauticalDawn: { ts: getTimes.nauticalDawn, name: SunStageEnum.nauticalDawn, valid: dayjs(getTimes.nauticalDawn).isValid() },
            nauticalDusk: { ts: getTimes.nauticalDusk, name: SunStageEnum.nauticalDusk, valid: dayjs(getTimes.nauticalDusk).isValid() },
            astronomicalDawn: { ts: getTimes.nightEnd, name: SunStageEnum.astronomicalDawn, valid: dayjs(getTimes.night).isValid() },
            astronomicalDusk: { ts: getTimes.night, name: SunStageEnum.astronomicalDusk, valid: dayjs(getTimes.nightEnd).isValid() },
            goldenHourDawnEnd: { ts: getTimes.goldenHourEnd, name: SunStageEnum.goldenHourDawnEnd, valid: dayjs(getTimes.goldenHourEnd).isValid() },
            goldenHourDawnStart: { ts: getTimes.goldenHour, name: SunStageEnum.goldenHourDawnStart, valid: dayjs(getTimes.goldenHour).isValid() }            
        };
    }

    return {
            getSunPosition,
            getDailySunPositions,
            getSunPositionInformation
        };
    }