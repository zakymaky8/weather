import loading from './loadgif.jpg';
import notfound from './notfound.jpg';

import './style.css'

//search
const srch = document.querySelector('#search');
const trigger = document.querySelector('#trigger');

// menu
const currentMenu =  document.querySelector('#cur')
const fore = document.querySelector('#fore')

//scales
const degFara = document.querySelector('#f');
const degCel = document.querySelector('#c');

const giphyImg = document.querySelector('#giphy')

const onlineBadge = document.querySelector('#online')
const dialog = document.querySelector('#dialog');
const spelNotice = document.querySelector('#spell-notice')

//contents on menu
const detail = document.querySelector('.detail')
const forcast = document.querySelector('.forecast')

//currents
const curTemp =  document.querySelector('#temp');
const conloc = document.querySelector('#country');
const locTime = document.querySelector('#lt');
const latLon = document.querySelector('#latlon')
const curIcon = document.querySelector('#cur-icon')
const curText = document.querySelector('#cur-text')
const curFeelsLike =  document.querySelector('#cur-feli')
const curHumi = document.querySelector('#cur-hum')
const curWindDir = document.querySelector('#cur-wd')
const loca = document.querySelector('#loc');
// dailies

const dailyIcon = document.querySelector('#daily-icon')
const dailyText = document.querySelector('#daily-text')
const issueDate = document.querySelector('#issue-date')
const dailyTempAv = document.querySelector('#daily-av-temp')
const maxTemp = document.querySelector('#max-tem');
const minTemp = document.querySelector('#min-tem');
const humAv = document.querySelector('#av-humi');
const daIChanRain = document.querySelector('#dai-chan-rain');

// hourlies

const zeroIcon = document.querySelector('#zero-icon');
const zeroTemp = document.querySelector('#zero-temp');
const zeroChanRain = document.querySelector('#chan-0-rain');

const threeIcon = document.querySelector('#three-icon');
const threeTemp = document.querySelector('#three-temp');
const threeChanRain = document.querySelector('#chan-3-rain');

const sixIcon = document.querySelector('#six-icon');
const sixTemp = document.querySelector('#six-temp');
const sixChanRain = document.querySelector('#chan-6-rain');

const nineIcon = document.querySelector('#nine-icon');
const nineTemp = document.querySelector('#nine-temp');
const nineChanRain = document.querySelector('#chan-9-rain');

const twelveIcon = document.querySelector('#twelve-icon');
const twelveTemp = document.querySelector('#twelve-temp');
const twelveChanRain = document.querySelector('#chan-12-rain');

const fifteenIcon = document.querySelector('#fifteen-icon');
const fifteenTemp = document.querySelector('#fifteen-temp');
const fifteenChanRain = document.querySelector('#chan-15-rain');

const eighteenIcon = document.querySelector('#eighteen-icon');
const eighteenTemp = document.querySelector('#eighteen-temp');
const eighteenChanRain = document.querySelector('#chan-18-rain');

const twentyOneIcon = document.querySelector('#twenty-one-icon');
const twentyOneTemp = document.querySelector('#twenty-one-temp');
const twentyOneChanRain = document.querySelector('#chan-21-rain');

//forcast days
const today = document.querySelector('#today');
const tomo = document.querySelector('#tomo');  
const nexTomo = document.querySelector('#nex-tomo'); 

let daysInWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Teusday",
    3: "Wednesday",
    4: "Thoursday",
    5: "Friday",
    6: "Saturday"
}
let monInYear = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}


srch.oninput = () => {
    srch.value = (srch.value !== '') ? srch.value[0].toUpperCase() + srch.value.slice(1,): null
}
nexTomo.textContent = daysInWeek[new Date().getDay() + 2];
giphyImg.src = loading;

let scale = 'c'
let issuDay = 0;
let data;
let requiredData;


function fetchGiphy(text) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=op0jnaciYHkf9yQkb6xtyFYnAUgeeJrD&s=${text}`)
        .then(data=> data.json())
        .then(data => giphyImg.src = data.data.images.original.url)
        .catch(()=>giphyImg.src = notfound)
}

// focuses
function addBg(el1, el2, el3) {
    el1.style.background = 'rgb(255,122,11,.5)'
    el2.style.background = 'none';
    el3 !== undefined ? el3.style.background = 'none' : null;
}

//scale toggle

let getLocation = new Promise((resolve)=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((p)=>{
            resolve(p.coords.latitude + ', ' + p.coords.longitude)
        });
    }
    ((error)=> {
        switch (error.code) {
            case error.PERMISSION_DENIED:
            case error.POSITION_UNAVILABLE:
            case error.TIMEOUT:
                resolve(9.0423107 + ', ' + 38.7675644)
                break;
        }
    })()
})

async function hitWeatherAPI(location) {
    try {
        let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6efdbfba838349169f0125342240503&q=${location}&days=3`);
        data  = await data.json();
        dialog.close()
        return data;
    }
    catch (e){
        dialog.textContent = e.message + ', try comming online 🐼'
        setTimeout(()=>dialog.close(), 2500)
    }
}

async function getRequiredData(day) {
    let data = await hitWeatherAPI(srch.value);

    requiredData = {
        current: {
            name: data.location.name,
            country: data.location.country,
            localTime: data.location.localtime,
            latlon: data.location.lat + ', ' + data.location.lon,
            icon: data.current.condition.icon,
            text: data.current.condition.text,
            temp: scale==='c' ? data.current.temp_c + ' °C': data.current.temp_f + ' °F',
            feelsLike: scale==='c' ? data.current.feelslike_c + ' °C': data.current.feelslike_f + ' °F',
            humidity: data.current.humidity,
            windDir: data.current.wind_dir
        },
        forecast: {
            someday: {
                daily: {
                    icon: data.forecast.forecastday[day].day.condition.icon,
                    text: data.forecast.forecastday[day].day.condition.text,
                    date: data.forecast.forecastday[day].date,
                    avgHum: data.forecast.forecastday[day].day.avghumidity,
                    avgTemp: scale==='c' ? data.forecast.forecastday[day].day.avgtemp_c + ' °C' : data.forecast.forecastday[day].day.avgtemp_f + ' °F',
                    minTemp: scale==='c' ? data.forecast.forecastday[day].day.mintemp_c  + ' °C': data.forecast.forecastday[day].day.mintemp_f + ' °F',
                    maxTemp: scale==='c' ? data.forecast.forecastday[day].day.maxtemp_c  + ' °C': data.forecast.forecastday[day].day.maxtemp_f + ' °F',
                    dailyChanceOfRain: data.forecast.forecastday[day].day.daily_chance_of_rain
                },
                hourly: {}
            }
        }
    };
    return data; // for the required date to come up with hourly data later
}
function getWithHourlyData(name, hr) {
    requiredData.forecast.someday.hourly[name] = {
        icon: data.forecast.forecastday[issuDay].hour[hr].condition.icon,
        temp: scale==='c' ? data.forecast.forecastday[issuDay].hour[hr].temp_c  + ' °C': data.forecast.forecastday[issuDay].hour[hr].temp_f + ' °F',
        chanceOfRain: data.forecast.forecastday[issuDay].hour[hr].chance_of_rain + '%'
    }
}

async function filtereData() {
    for (let i=0; i<24; i++) {
        if (i%3===0) {
            getWithHourlyData(i, i)
        }
    }
    renderOnUi()
}

function renderOnUi() {
    //current details

    locTime.textContent = requiredData.current.localTime;
    latLon.textContent = requiredData.current.latlon;
    curTemp.textContent = requiredData.current.temp;
    curIcon.src = requiredData.current.icon;
    curText.textContent = requiredData.current.text;
    curFeelsLike.textContent = requiredData.current.feelsLike;
    curHumi.textContent = requiredData.current.humidity;
    curWindDir.textContent = requiredData.current.windDir;
    conloc.textContent = requiredData.current.name + '/ ' + requiredData.current.country
    loca.textContent = requiredData.current.name;

    //daily
    dailyIcon.src = requiredData.forecast.someday.daily.icon;
    dailyText.textContent = requiredData.forecast.someday.daily.text;
    issueDate.textContent = daysInWeek[new Date(requiredData.forecast.someday.daily.date).getDay()] + ', ' + monInYear[new Date(requiredData.forecast.someday.daily.date).getMonth()+1] + ' ' + new Date().getFullYear()
    dailyTempAv.textContent = requiredData.forecast.someday.daily.avgTemp
    maxTemp.textContent = requiredData.forecast.someday.daily.maxTemp;
    minTemp.textContent = requiredData.forecast.someday.daily.minTemp;
    humAv.textContent = requiredData.forecast.someday.daily.avgHum + '%';
    daIChanRain.textContent = requiredData.forecast.someday.daily.dailyChanceOfRain + '%'

    // hourly
    zeroIcon.src = requiredData.forecast.someday.hourly[0].icon;
    zeroTemp.textContent = requiredData.forecast.someday.hourly[0].temp;
    zeroChanRain.textContent = requiredData.forecast.someday.hourly[0].chanceOfRain

    threeIcon.src = requiredData.forecast.someday.hourly[3].icon;
    threeTemp.textContent = requiredData.forecast.someday.hourly[3].temp;
    threeChanRain.textContent = requiredData.forecast.someday.hourly[3].chanceOfRain

    sixIcon.src = requiredData.forecast.someday.hourly[6].icon;
    sixTemp.textContent = requiredData.forecast.someday.hourly[6].temp;
    sixChanRain.textContent = requiredData.forecast.someday.hourly[6].chanceOfRain

    nineIcon.src = requiredData.forecast.someday.hourly[9].icon;
    nineTemp.textContent = requiredData.forecast.someday.hourly[9].temp;
    nineChanRain.textContent = requiredData.forecast.someday.hourly[9].chanceOfRain

    twelveIcon.src = requiredData.forecast.someday.hourly[12].icon;
    twelveTemp.textContent = requiredData.forecast.someday.hourly[12].temp;
    twelveChanRain.textContent = requiredData.forecast.someday.hourly[12].chanceOfRain

    fifteenIcon.src = requiredData.forecast.someday.hourly[15].icon;
    fifteenTemp.textContent = requiredData.forecast.someday.hourly[15].temp;
    fifteenChanRain.textContent = requiredData.forecast.someday.hourly[15].chanceOfRain

    eighteenIcon.src = requiredData.forecast.someday.hourly[18].icon;
    eighteenTemp.textContent = requiredData.forecast.someday.hourly[18].temp;
    eighteenChanRain.textContent = requiredData.forecast.someday.hourly[18].chanceOfRain

    twentyOneIcon.src = requiredData.forecast.someday.hourly[21].icon;
    twentyOneTemp.textContent = requiredData.forecast.someday.hourly[21].temp;
    twentyOneChanRain.textContent = requiredData.forecast.someday.hourly[21].chanceOfRain
}

// event listeners

//windows first load

window.onload = async() =>{
    dialog.showModal()
    today.style.background =  issuDay===0 ? 'rgb(255,122,11,.5)' : 'none';
    degCel.style.background = scale==='c' ?  'rgb(255,122,11,.5)' : 'none';
    currentMenu.style.background = 'rgb(255,122,11,.5)'
    try {
        let latlon = await getLocation;
        srch.value = latlon;
    }
    catch (e) {
        srch.value = '9.0423107, 38.7675644'
    }
    data = await getRequiredData(issuDay)
    filtereData()
    fetchGiphy(requiredData.current.text)
}

//search trigerer

trigger.addEventListener('click', async (e)=>{
    e.preventDefault();
    dialog.showModal()
    try {
        data = await getRequiredData(issuDay)
        filtereData()
        fetchGiphy(requiredData.current.text)
    }
    catch (e) {
        srch.value = 'Addis Ababa';
        spelNotice.style.display = 'inline'
        setTimeout(()=>spelNotice.style.display='none',2000)
    }
})

// scale togglers
degCel.onclick = async () => {
    scale = 'c';
    addBg(degCel, degFara)
    data = await getRequiredData(issuDay)
    filtereData()
}
degFara.onclick = async () => {
    scale = 'f';
    addBg(degFara,degCel)
    data = await getRequiredData(issuDay)
    filtereData()
}

// day togglers
today.onclick = async () => {
    issuDay = 0;
    addBg(today, tomo, nexTomo)
    data = await getRequiredData(0);
    filtereData()
}

tomo.onclick = async () => {
    addBg(tomo,today, nexTomo)
    issuDay = 1;
    data = await getRequiredData(1);
    filtereData()
}

nexTomo.onclick = async () => {
    addBg(nexTomo, today, tomo)
    issuDay = 2;
    data = await getRequiredData(2);
    filtereData()
}

// on and off line notifications
window.addEventListener('offline', ()=>{
    dialog.textContent = 'You are offline';
    dialog.showModal()
    setTimeout(()=>dialog.close(), 2500)
})
window.addEventListener('online', ()=>{
    dialog.innerHTML = 'back online' + ' <br><br> <button style="float: right" onclick="()=>dialog.close()"> OK </button>'
    onlineBadge.style.visibility = 'visible'
    document.location.reload()
})
// type of data togglers
currentMenu.onclick = () =>{
    detail.style.display = 'flex';
    forcast.style.display = 'none'
    addBg(currentMenu, fore)
}
fore.onclick = () => {
    detail.style.display = 'none';
    forcast.style.display = 'flex'
    addBg(fore, currentMenu)
}