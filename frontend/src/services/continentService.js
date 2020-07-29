
import httpService from './httpService.js'

export default {
    query
}

async function query(data) {
    var res;
    if(!data) {
        res = await httpService.get('/continent')
    } else {
        res = await httpService.get(`/country/${data}`)
    }
    return res
}

