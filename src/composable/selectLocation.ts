export const useSelectLocation = () => {
    const locationAvailable = [
        { name: "New York, USA", latitude: 40.7128, longitude: -74.0060 },
        { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
        { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917 },
        { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 },
        { name: "Cairo, Egypt", latitude: 30.0444, longitude: 31.2357 },
        { name: "Lyon, France", latitude: 45.7640, longitude: 4.8357 },
        { name: "Tromsø, Norway", latitude: 69.6496, longitude: 18.9560 }
    ]

    return { locationAvailable }
}