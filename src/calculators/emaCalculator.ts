import { EMA as EMAInterface } from 'technicalindicators';

interface EMAInput {
    closedPrices: number[],
    emaPeriod: number
}

export function calculateEMA({closedPrices, emaPeriod}: EMAInput): number[]  {
    const ema = EMAInterface.calculate({period: emaPeriod, values: closedPrices});
    return ema;
}

;