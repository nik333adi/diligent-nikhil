const axios = require('axios');
const dotenv = require('dotenv');


dotenv.config();

// Simple in-memory cache
const cache = {};

async function fetchExchangeRates(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const currentTime = Date.now();

    // Check if the data is in the cache and still valid
    if (cache[cacheKey] && (currentTime - cache[cacheKey].timestamp) < 60 * 60 * 1000) {
        console.log('Returning cached data');
        return cache[cacheKey].data;
    }

    const options = {
        method: 'GET',
        url: 'https://currency-converter5.p.rapidapi.com/currency/convert',
        params: {
            format: 'json',
            from: fromCurrency,
            to: toCurrency,
            amount: '1'
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY, 
            'X-RapidAPI-Host': process.env.HOST 
        }
    };
    
    try {
        const response = await axios.request(options);
        // Update the cache with the new data and the current time
        cache[cacheKey] = {
            data: response.data,
            timestamp: currentTime
        };
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = fetchExchangeRates;