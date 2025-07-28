import numeral from "numeral";
import { DECIMAL_PLACE } from "./constant";

// ----------------------------------------------------------------------

export function fNumber(number) {
    return numeral(number).format();
}

export function fCurrency(number) {
    const format = number ? numeral(number).format("$0,0.00") : "";

    return result(format, ".00");
}

export function fPercent(number) {
    const format = number ? numeral(Number(number) / 100).format("0.0%") : "";

    return result(format, ".0");
}

export function fShortenNumber(number) {
    const format = number ? numeral(number).format("0.00a") : "";

    return result(format, ".00");
}

export function fData(number) {
    const format = number ? numeral(number).format("0.0 b") : "";

    return result(format, ".0");
}

function result(format, key = ".00") {
    const isInteger = format.includes(key);

    return isInteger ? format.replace(key, "") : format;
}

export function convertDecimalValue(decimalPlaces) {
    decimalPlaces == 0 ? (decimalPlaces = DECIMAL_PLACE) : decimalPlaces;
    const divisor = Math.pow(10, decimalPlaces);
    return (1 / divisor).toFixed(decimalPlaces);
}