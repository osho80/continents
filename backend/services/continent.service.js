
const redis = require('redis');
const fetch = require('node-fetch');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const CONTINENTS_KEY = 'continent:list';


module.exports = {
    getContinents,
    cacheContinents
} 

async function getContinents(req, res, next) {
    try {
      const response = await fetch('https://countries.trevorblades.com/graphql?query={continents{code, name}}');  
      const data = await response.json();
      const continents = data.data.continents;
      await redisSetContinents(continents)  
      
      res.send(continents);

    } catch(err) {
        console.log(err);
        res.status(500);
    } 
}


function redisSetContinents(continents) {
    continents.forEach(continent => {
        client.HMSET(CONTINENTS_KEY, continent.name, continent.code)
    })
}

// Cache middleware
async function cacheContinents(req, res, next) {
    client.HGETALL(CONTINENTS_KEY, (err, data)=> {
        if(err) throw err;
        if(data !== null) {
            let continents = formatData(data);
            res.send(continents);  
        } else {
           next(); 
        }
    })
}

function formatData(data) {

    let keys = Object.keys(data);
    let vals = Object.values(data)
    let continents = []
    for(let i=0; i<keys.length; i++) {
        continents.push({name: keys[i], code: vals[i]})
    }
    return continents
}


