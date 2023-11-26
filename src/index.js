
const emaCalculator = require('./calculators/emaCalculator');
const rsiCalculator = require('./calculators/rsiCalculator');
const desktopAlert = require('./alert/desktopAlert');
const fetchResponse = require('./apiService');
const appConfig = require('./settings/config');



const priceState = {
    price: 0,
    state: ''
};

const {
    type,
    symbol,
    emaPeriod,
    interval,
    limit,
    divergencePeriod,
    intervalToRefresh,
    upIcon,
    downIcon
} = appConfig;


setInterval(async () => {
    try {

        console.log(priceState, "PRICE STATE");
        const priceInfo = await fetchResponse({
            type,
            arguments: [symbol, interval, limit]
        });
        const priceOnly = await fetchResponse({
            type: 'basic',
            arguments: [symbol]
        });
        // const exchangeInfo = await fetchResponse({
        //     type: 'rateLimits',
        //     arguments: []
        // });
        
        const closedPrices = priceInfo.map((item) => parseFloat(item[4]));

        const ema = emaCalculator(closedPrices, emaPeriod);    
        const {rsi, divergence} = rsiCalculator(closedPrices, divergencePeriod);

        const lastEma = ema.pop();
        const lastRsi = rsi.pop();

        if ((priceOnly.price > lastEma) && priceState.state !== 'above') {
            desktopAlert(symbol, `Price is above EMA RSI:${lastRsi} divergence: ${divergence}`, upIcon);            
            priceState.state = 'above';
        } 

        if (priceOnly.price < lastEma && priceState.state !== 'below') {
            desktopAlert(symbol,`Price is below EMA RSI:${lastRsi}  divergence: ${divergence}`, downIcon);            
            priceState.state = 'below';
        }

        if (lastRsi > 70 && priceState.state !== 'overbought') {
            desktopAlert(`RSI ${symbol}`, 'Price is overbought');            
            // priceState.state = 'overbought';
        }

        if (lastRsi < 30 && priceState.state !== 'oversold') {
            desktopAlert(`RSI ${symbol}`, 'Price is oversold');            
            // priceState.state = 'oversold';
        }
        
        console.log(`Price: ${priceOnly.price}, EMA: ${lastEma}, RSI: ${lastRsi} `);
        // console.log(exchangeInfo, "EXCHANGE INFO")
        priceState.price = priceOnly.price;
        

    } catch (error) {
        console.error('Error fetching price', error);
    }    
}, 
6*10**4 * intervalToRefresh);
// 1000 * intervalToRefresh);