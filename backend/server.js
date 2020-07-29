const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const cors = require('cors');

const { getContinents, cacheContinents } = require('./services/continent.service.js');
const { getCountries, cacheCountry } = require('./services/country.service.js')
const PORT = process.env.PORT || 3030;

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


app.get('/api/continent', cacheContinents, getContinents)
app.get('/api/country/:code', cacheCountry, getCountries)
app.listen(3030, ()=> {
    console.log(`App listening on port ${PORT}`);
});