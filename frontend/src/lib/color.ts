export function toHSL(hex: string): string {
    // Remove the '#' if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hex values to RGB
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    // Find the maximum and minimum values for RGB
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate the lightness (L)
    let l = (max + min) / 2;
    let h = 0
    let s = 0

    // Check if it's a grayscale color (no saturation)
    if (max === min) {
        h = 0; // Hue doesn't matter for grayscale
        s = 0; // Saturation is 0 for grayscale
    } else {
        // Calculate the saturation (S)
        s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

        // Calculate the hue (H)
        if (max === r) {
            h = ((g - b) / (max - min)) * 60;
        } else if (max === g) {
            h = 60 + ((b - r) / (max - min)) * 60;
        } else if (max === b) {
            h = 120 + ((r - g) / (max - min)) * 60;
        }

        // Ensure the hue is positive
        if (h < 0) {
            h += 360;
        }
    }

    // Round the values and create the HSL string
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;


}