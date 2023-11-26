export const appConfig = { 
    type: 'klines',
    symbol: 'BTCUSDT',
    emaPeriod: 12,
    interval: '5m',
    limit: 300, //klines limit
    divergencePeriod: 40,// klines period
    intervalToRefresh:  1, // minutes,
    upIcon: './assets/bullish.png',
    downIcon: './assets/bearish.png',
};

