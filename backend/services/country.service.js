const redis = require('redis');
const fetch = require('node-fetch');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

module.exports = {
    getCountries,
    cacheCountry 
} 

async function getCountries(req, res, next) {
    let code = req.params.code;
    try {
      const response = await fetch(`https://countries.trevorblades.com/graphql?query={continent(code:"${code}"){countries{code, name, capital, currency, phone, languages {name}}}}`);  
      const data = await response.json();
      const countries = data.data.continent.countries
      await redisSetCountries(code, countries)  
      
      res.send(countries);

    } catch(err) {
        console.log(err);
        res.status(500);
    } 
}

function redisSetCountries(code, countries) {
    countries.forEach(country => {
        country.languages = getLanguages(country.languages);
        let data = Object.values(country)
        client.HMSET(code, country.code, data.join())
    })
}

function getLanguages(languagesArr) {

    var languages = [];
    for(let i = 0; i < languagesArr.length; i++){
        if(!languagesArr[i]) return
        languages.push(languagesArr[i].name)
    }
    languagesStr = languages.join()
    return languagesStr;
}

// Cache middleware
async function cacheCountry(req, res, next) {
    let code = req.params.code;
    client.HGETALL(code, (err, data)=> {
        if(err) throw err;
        if(data !== null) {
            let countries = formatData(data);
            res.send(countries);  
        } else {
           next(); 
        }
    })
}

function formatData(data) {
    let countries = []
    for(key in data) {
        let i = data[key].split(',');
        let country = {
            code: i[0],
            name: i[1],
            capital: i[2],
            currency: i[3],
            phone: i[4],
            languages: lang(i)
        }
        countries.push(country)

    }
    
    return countries
}

function lang(arr) {
    var languages = '';
    for(let i = 5; i < arr.length; i++) {
        languages += arr[i]
    }
    return languages
}
