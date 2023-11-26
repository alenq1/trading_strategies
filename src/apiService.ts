import axios from 'axios'

const apiSources = {
  binance: 'https://api.binance.com/api/',
  binanceFutures: 'https://fapi.binance.com/fapi/',
}

interface TypeSearch {
  basic: (symbol: string) => string;
  klines: (symbol: string, interval: string, limit: number) => string;
  openInterest: (symbol: string) => string;
  openInterestStats: (symbol: string, period: string, limit: number) => string;
  rateLimits: () => string;
  lastDayStatistics: (symbol: string) => string;
}

const typeSearch: TypeSearch = {
  basic: (symbol) => `${apiSources.binance}v3/ticker/price?symbol=${symbol}`,
  klines: (symbol, interval, limit) => `${apiSources.binance}v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
  openInterest: (symbol) => `${apiSources.binanceFutures}/v1/openInterest?symbol=${symbol}`,
  openInterestStats: (symbol, period, limit) => `${apiSources.binanceFutures}/v1/openInterestHist?symbol=${symbol}&period=${period}&limit=${limit}`,
  rateLimits: () => `${apiSources.binance}v3/exchangeInfo`,
  lastDayStatistics: (symbol) => `${apiSources.binance}v3/ticker/24hr?symbol=${symbol}`
}

interface Search<T extends any[]> {
  type: keyof TypeSearch;
  args: T;
}


export const fetchResponse = async <T extends any[]>(search: Search<T>) => {
  
  try {
    const { type, args } = search;

    const params = [...args]
    // @ts-ignore
    const response = await axios.get(typeSearch[type as keyof TypeSearch](...params));
    // console.log(response.data, "RESPONSE DATA");
    if(search.type === 'rateLimits') {
      console.log(response.headers, "RATE LIMITS");
    }
    return response.data;

  } catch (error) {
    console.error(`Error getting data: ${error}`);
  }
};

