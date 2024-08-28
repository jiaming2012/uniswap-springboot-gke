import { BigNumber } from '@ethersproject/bignumber';
import { parseUnits, formatUnits } from '@ethersproject/units';

const READABLE_FORM_LEN = 12

export function fromReadableAmount(
  amount: number,
  decimals: number
): BigNumber {
  return parseUnits(amount.toString(), decimals)
}

export function toReadableAmount(rawAmount: BigNumber, decimals: number): string {
  return formatUnits(rawAmount, decimals)
            .slice(0, READABLE_FORM_LEN)
}
