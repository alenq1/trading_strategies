const axios = require('axios');

const apiSources = {
  binance: 'https://api.binance.com/api/',
  binanceFutures: 'https://fapi.binance.com/fapi/',
}

const typeSearch = {

  basic: (symbol)=>`${apiSources.binance}v3/ticker/price?symbol=${symbol}`,
  klines: (symbol, interval, limit)=>`${apiSources.binance}v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
  openInterest: (symbol)=>`${apiSources.binanceFutures}/v1/openInterest?symbol=${symbol}`,
  openInterestStats: (symbol, period, limit)=>`${apiSources.binanceFutures}/v1/openInterestHist?symbol=${symbol}&period=${period}&limit=${limit}`,
  rateLimits: ()=>`${apiSources.binance}v3/exchangeInfo`,

}


const fetchResponse = async (search) => {
  
  try {
    const response = await axios.get(typeSearch[search.type](...search.arguments));
    // console.log(response.data, "RESPONSE DATA");
    if(search.type === 'rateLimits') {
      console.log(response.headers, "RATE LIMITS");
    }
    return response.data;

  } catch (error) {
    console.error(`Error getting data: ${error}`);
  }
};

module.exports = fetchResponse;