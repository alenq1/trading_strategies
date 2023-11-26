const RSI = require('technicalindicators').RSI;

const calculateRSI = (prices, divergencePeriod) => {  
  const inputRSI = {
    values: prices,
    period: 14
  };
  const rsi = RSI.calculate(inputRSI);  
  const lastPrices = prices.slice(divergencePeriod);
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

module.exports = calculateRSI;