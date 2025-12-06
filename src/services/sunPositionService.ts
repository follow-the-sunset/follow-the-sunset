import dayjs from 'dayjs';
import SunCalc from 'suncalc3';

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
                sunPosition: pos
            }
        });
    }

    const getSunPositionInformation = (latitude: number, longitude: number, date: Date) => {
        return SunCalc.getSunTimes(date, latitude, longitude);
    }

    return {
            getSunPosition,
            getDailySunPositions,
            getSunPositionInformation
        };
    }