
const EMA = require('technicalindicators').EMA

function calculateEMA(priceArray, periods) {
    const ema = EMA.calculate({period: periods, values: priceArray});
    return ema;
}

module.exports = calculateEMA;