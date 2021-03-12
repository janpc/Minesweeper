function hex_to_RGB(hex) {
  var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

export function calculateColor(distance, maxDistance) {
  const initialColor = hex_to_RGB("#000000");
  const finalColor = hex_to_RGB("#62E0F6");

  const red =
    ((maxDistance - distance) / maxDistance) * initialColor.r +
    (distance / maxDistance) * finalColor.r;
  const green =
    ((maxDistance - distance) / maxDistance) * initialColor.g +
    (distance / maxDistance) * finalColor.g;
  const blue =
    ((maxDistance - distance) / maxDistance) * initialColor.b +
    (distance / maxDistance) * finalColor.b;

  const result = "rgb(" + red + "," + green + "," + blue + ")";
  return result;
}

export function rgbToHex(rgb) {
  rgb = rgb.substring(4, rgb.length - 2);
  rgb = rgb.split(",");

  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];

  return "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
}
