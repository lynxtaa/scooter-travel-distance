type ConvertFn = (value: number) => number

export const kgToPounds: ConvertFn = value => value * 2.20462

export const poundsToKg: ConvertFn = value => value / 2.20462

export const kmToMiles: ConvertFn = value => value * 0.621371

export const milesToKm: ConvertFn = value => value / 0.621371

export const celsiusToFahrenheit: ConvertFn = value => (value * 9) / 5 + 32

export const fahrenheitToCelius: ConvertFn = value => ((value - 32) * 5) / 9
