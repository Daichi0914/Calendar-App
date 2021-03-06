import axios from 'axios';

require('dotenv').config({ debug: true });
const apiKey = process.env.REACT_APP_API_KEY;

const url = `https://api.openweathermap.org/data/2.5/onecall?lat=35.681236&lon=139.767125&mode=json&units=metric&lang=en&appid=${apiKey}`

// FIXME: Warning -> Assign object to a variable before exporting as module default  import/no-anonymous-default-export
export default {
  OpenWeather: () => axios.get(`${url}&cnt=7`)
}
