import { useLocationSourceStore } from "@/stores/localisationSource";
import type { City } from "@/types/city"

export const useSelectLocation = () => {

    const locationAvailable: City[] = useLocationSourceStore().getSource();

    return { locationAvailable }
}