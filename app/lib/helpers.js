// sunny 0 1
// partly cloudy 2
// overcast 3
// fog 45, 48
// drizzle 51 53 55 56 57
// rain 61 63 65 66 67 80 81 82
// snow 71 73 75 77 85 86
// storm 95 96 99

const calculate_weatherCondition = (data) => {
    if (data == 0 || data == 1) {
        return "/icon-sunny.webp";
    } else if (data == 2) {
        return "icon-partly-cloudy.webp";
    } else if (data == 3) {
        return "icon-overcast.webp";
    } else if (data == 45 || data == 48) {
        return "icon-fog.webp";
    } else if (data == 51 || data == 53 || data == 55 || data == 56 || data == 57) {
        return "icon-drizzle.webp";
    } else if (data == 61 || data == 63 || data == 65 || data == 66 || data == 67 || data == 80 || data == 81 || data == 82) {
        return "icon-rain.webp";
    } else if (data == 71 || data == 73 || data == 75 || data == 77 || data == 85 || data == 86) {
        return "icon-snow.webp";
    } else if (data == 95 || data == 96 || data == 99) {
        return "icon-storm.webp";
    }
}

export { calculate_weatherCondition };