
import {calculateEMA} from  './calculators/emaCalculator'
import {calculateRSI} from  './calculators/rsiCalculator'
import {sendDesktopAlert} from  './alert/desktopAlert'
import {fetchResponse} from  './apiService'
import {appConfig} from  './settings/config'



const priceState = {
    price: 0,
    state: '',
    rsi: '',
    percent_change: 0,
    current_trend: ''
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
            type: 'klines',
            args: [symbol, interval, limit]
        });
        const priceOnly = await fetchResponse({
            type: 'basic',
            args: [symbol]
        });        
        // const exchangeInfo = await fetchResponse({
        //     type: 'rateLimits',
        //     args: []
        // });
        const lastDayStatistics = await fetchResponse({
            type: 'lastDayStatistics',
            args: [symbol]
        })

        const closedPrices = priceInfo.map((item: any) => parseFloat(item[4]));

        const ema = calculateEMA({closedPrices, emaPeriod});    
        const {rsi, divergence} = calculateRSI({closedPrices, divergencePeriod});

        const lastEma = ema.pop() ?? 0;
        const lastRsi = rsi.pop() ?? 0;

        const {priceChangePercent, priceChange, prevClosePrice: lastDayPrice} = lastDayStatistics;
        console.log( lastDayPrice, "LAST DAY Statistics");

        if ((priceOnly.price > lastEma) && priceState.state !== 'above') {
            sendDesktopAlert({title: symbol, message: `Price is above EMA RSI:${lastRsi} divergence: ${divergence}`, icon: upIcon});            
            priceState.state = 'above';
        } 

        if (priceOnly.price < lastEma && priceState.state !== 'below') {
            sendDesktopAlert({ title: symbol, message: `Price is below EMA RSI:${lastRsi}  divergence: ${divergence}`, icon: downIcon});            
            priceState.state = 'below';
        }

        if (lastRsi > 70 && priceState.rsi !== 'overbought') {
            sendDesktopAlert({ title: `RSI ${symbol}`, message: 'Price is overbought'});    
            priceState.rsi = 'overbought';        
            // priceState.state = 'overbought';
        }

        else if (lastRsi < 30 && priceState.rsi !== 'oversold') {
            sendDesktopAlert({ title: `RSI ${symbol}`, message: 'Price is oversold'});            
            priceState.rsi = 'oversold';
            // priceState.state = 'oversold';
        }
        else {
            priceState.rsi = 'normal';
        }



        if(lastDayPrice > priceState.price) {
            priceState.current_trend = 'down';
        }
        else if(lastDayPrice < priceState.price) {
            priceState.current_trend = 'up';
        }
        else {
            priceState.current_trend = 'stable';
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