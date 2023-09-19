const request = require('request')

const forecast = (lat,long,callback) =>{
    const apiKey = '25f605de44a853c1a5f410126c175585';
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${long}`;

    request({url:url,json:true},(error,response)=>{
        if (error) {
            callback('URL not found', undefined);
          } else if (response.body.length === 0) {
            callback('Location not found', undefined);
          } else {
            callback(undefined, response.body.current);
          }
    })
}

module.exports = forecast