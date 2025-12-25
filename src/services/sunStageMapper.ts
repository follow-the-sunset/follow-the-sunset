import { SunStageEnum } from "@/types/sunStageEnum"

export const sunStageFrLabel = (stage: SunStageEnum): String => {
    switch (stage) {
        case SunStageEnum.amateurDawn:
            return "Aube amateur";
        case SunStageEnum.amateurDusk:
            return "Crépuscule amateur";
        case SunStageEnum.astronomicalDawn:
            // return "Aube astronomique";
            return "Astro";
        case SunStageEnum.astronomicalDusk:
            // return "Crépuscule astronomique";
            return "Astro";
        case SunStageEnum.blueHourDawnEnd:
            return "Fin de l'heure bleue du matin";
        case SunStageEnum.blueHourDawnStart:
            return "Début de l'heure bleue du matin";
        case SunStageEnum.blueHourDuskEnd:
            return "Fin de l'heure bleue du soir";
        case SunStageEnum.blueHourDuskStart:
            return "Début de l'heure bleue du soir";
        case SunStageEnum.civilDawn:
            // return "Aube civile";
            return "Civil";
        case SunStageEnum.civilDusk:
            // return "Crépuscule civil";
            return "Civil";
        case SunStageEnum.goldenHourDawnEnd:
            return "Fin de l'heure dorée du matin";
        case SunStageEnum.goldenHourDawnStart:
            return "Début de l'heure dorée du matin";
        case SunStageEnum.goldenHourDuskEnd:
            return "Fin de l'heure dorée du soir";
        case SunStageEnum.goldenHourDuskStart:
            return "Début de l'heure dorée du soir";
        case SunStageEnum.nadir:
            return "Nadir";
        case SunStageEnum.nauticalDawn:
            // return "Aube nautique";
            return "Nautique";
        case SunStageEnum.nauticalDusk:
            // return "Crépuscule nautique";
            return "Nautique";
        case SunStageEnum.solarNoon:
            // return "Midi solaire";
            return "Zenith";
        case SunStageEnum.sunriseEnd:
            return "Fin du lever du soleil";
        case SunStageEnum.sunriseStart:
            // return "Début du lever du soleil";
            return "Lever";
        case SunStageEnum.sunsetEnd:
            return "Fin du coucher du soleil";
        case SunStageEnum.sunsetStart:
            // return "Début du coucher du soleil";
            return "Coucher";
    }
}