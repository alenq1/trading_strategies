// const RSI = require('technicalindicators').RSI;
import { RSI as RSIInterface } from 'technicalindicators';

interface RSIInput {
  closedPrices: number[],
  divergencePeriod: number
}

export const calculateRSI = ({closedPrices, divergencePeriod}:RSIInput) => {  
  const inputRSI = {
    values: closedPrices,
    period: 14
  };
  const rsi = RSIInterface.calculate(inputRSI);  
  const lastPrices = closedPrices.slice(divergencePeriod);
  const lastRsi = rsi.slice(divergencePeriod);

  // Detectar divergencias
  let divergence = 'No divergence';
  if (lastPrices[lastPrices.length - 1] > lastPrices[lastPrices.length - 2] && lastRsi[lastRsi.length - 1] < lastRsi[lastRsi.length - 2]) {
    divergence = 'bearish divergence';
  } else if (lastPrices[lastPrices.length - 1] < lastPrices[lastPrices.length - 2] && lastRsi[lastRsi.length - 1] > lastRsi[lastRsi.length - 2]) {
    divergence = 'bullish divergence';
  }

  console.log(divergence);
  return {
    rsi,
    divergence
  };
};

