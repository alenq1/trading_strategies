const appConfig = { 
    type: 'klines',
    symbol: 'BTCUSDT',
    emaPeriod: 12,
    interval: '5m',
    limit: 300, //klines limit
    divergencePeriod: 20,// klines period
    intervalToRefresh:  1, // minutes,
    upIcon: './assets/bullish.png',
    downIcon: './assets/bearish.png',
};

module.exports = appConfig;