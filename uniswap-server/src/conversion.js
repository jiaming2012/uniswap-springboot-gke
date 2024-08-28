"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromReadableAmount = fromReadableAmount;
exports.toReadableAmount = toReadableAmount;
const units_1 = require("@ethersproject/units");
const READABLE_FORM_LEN = 12;
function fromReadableAmount(amount, decimals) {
    return (0, units_1.parseUnits)(amount.toString(), decimals);
}
function toReadableAmount(rawAmount, decimals) {
    return (0, units_1.formatUnits)(rawAmount, decimals)
        .slice(0, READABLE_FORM_LEN);
}
