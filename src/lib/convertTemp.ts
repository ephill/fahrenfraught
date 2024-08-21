export function convertFahrenheitToCelsius(temp: number) {
  return Math.round((temp - 32) * (5 / 9) * 10) / 10;
}
