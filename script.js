window.addEventListener('load', () => {
    let lon;
    let lat;
    const key = '3f71a27cabefb4c379600b76e0d4f2ea'
    let temperature = document.querySelector('.degry')
    let countryy = document.querySelector('.country')
    let country_code = document.querySelector('.country_code')
    let descriptionn = document.querySelector('.description')
    let max_tmp = document.querySelector('.max_tmp')
    let min_tmp = document.querySelector('.min_tmp')
    let heum = document.querySelector('.heum')
    let windd = document.querySelector('.wind')
    //========================================================
    let now_time =document.querySelector('.now_time')
    let sun_ris = document.querySelector('.sun_rise')
    let sun_set = document.querySelector('.sun_set')

    // ======================= icons Day ========================
    let sun = "https://image.flaticon.com/icons/svg/1163/1163662.svg"
    let few_cloud = "https://image.flaticon.com/icons/svg/861/861059.svg"
    let cloud = "https://image.flaticon.com/icons/svg/252/252035.svg"
    let drizel = "https://image.flaticon.com/icons/svg/2948/2948216.svg"
    let rain = "https://image.flaticon.com/icons/svg/1164/1164945.svg"
    let thunder_rain = "https://image.flaticon.com/icons/svg/1146/1146860.svg"
    let snow = "https://image.flaticon.com/icons/svg/2938/2938107.svg"
    let wind = "https://image.flaticon.com/icons/svg/1164/1164960.svg"
    let mist = "https://image.flaticon.com/icons/svg/1164/1164981.svg"

    // ======================= icons Night ========================
    let moon = 'https://image.flaticon.com/icons/svg/667/667421.svg'
    let cloud_moon = 'https://image.flaticon.com/icons/svg/2413/2413210.svg'
    let snow_moon = "https://image.flaticon.com/icons/svg/481/481462.svg"
    let rain_moon = "https://image.flaticon.com/icons/svg/1458/1458815.svg"
    let wind_moon = "https://image.flaticon.com/icons/svg/974/974247.svg"
    let thunder_moon = "https://image.flaticon.com/icons/svg/1200/1200442.svg"
    let drizel_moon = "https://image.flaticon.com/icons/svg/481/481459.svg"
    let mist_moon = "https://image.flaticon.com/icons/svg/175/175866.svg"

    let icon = document.querySelector('.icon')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude
            lat = position.coords.latitude

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

            fetch(api)
                .then(respose => {
                    return respose.json()
                })
                .then(data => {
                    const main = data.main

                    //============= kelvin to celcus ================
                    let temp = Math.round(data.main.temp - 273.15) + '\xB0'
                    let max_temp = Math.round(main.temp_max - 273.15) + '\xB0'
                    let min_temp = Math.round(main.temp_min - 273.15) + '\xB0'
                    let humidity = main.humidity + '%'
                    let location = data.name
                    // few clouds
                    let description_more = data.weather[0].description
                    // just 'cloud'
                    let description = data.weather[0].main
                    // console.log(description)
                    let country = data.sys.country
                    let win = data.wind.speed

                    windd.textContent = win+" m/s"

                    //============================= Time ===================
                    let now_tim = new Date()
                    let now_hours = now_tim.getHours();
                    let now_minutes = now_tim.getMinutes();
                    now_time.textContent = (now_hours + ':' + now_minutes)

                    let sun_rs = data.sys.sunrise
                    let sun_st = data.sys.sunset
                    

                    let rise_time = new Date(sun_rs * 1000)
                    let rise_hours = rise_time.getHours();
                    let rise_minutes = rise_time.getMinutes();
                    // console.log(hours+':'+minutes)

                    let set_time = new Date(sun_st * 1000)
                    let set_hours = set_time.getHours();
                    let set_minutes = set_time.getMinutes();
                    // console.log(hours+':'+minutes)

                    //=============================

                    //  console.log(data)



                    // set DOM elements fro API =================
                    temperature.textContent = temp
                    countryy.textContent = location
                    // to captilize first letter
                    descriptionn.textContent = description_more[0].toUpperCase() + description_more.substring(1);
                    country_code.textContent = country
                    max_tmp.textContent = max_temp
                    min_tmp.textContent = min_temp
                    heum.textContent = humidity
                    sun_ris.textContent = (rise_hours + ':' + rise_minutes)
                    sun_set.textContent = (set_hours + ':' + set_minutes)

                    //===================== icons ======================


                    if (rise_time < set_time) {

                        //============ Day Time Icons ===========
                        if (description == "Clear") {
                            icon.src = sun
                        } else if (description == "Clouds") {
                            icon.src = cloud
                        }
                        // if (description == "Clouds" && description_more == "few clouds") {
                        //     icon.src = few_cloud} 
                            else if (description == "Drizzle") {
                            icon.src = drizel
                        } else if (description == "Rain") {
                            icon.src = rain
                        } else if (description == "Thunderstorm") {
                            icon.src = thunder_rain
                        } else if (description == "Snow") {
                            icon.src = snow
                        } else if (description == "Squall") {
                            icon.src = wind
                        } else {
                            icon.src = mist
                        }
                        //============ Night Time Icons ===========
                    } else {

                        if (description == "Clear") {
                            icon.src = moon
                        } else if (description == "Clouds") {
                            icon.src = cloud_moon
                        }
                         else if (description == "Drizzle") {
                            icon.src = drizel_moon
                        } else if (description == "Rain") {
                            icon.src = rain_moon
                        } else if (description == "Thunderstorm") {
                            icon.src = thunder_moon
                        } else if (description == "Snow") {
                            icon.src = snow_moon
                        } else if (description == "Squall") {
                            icon.src = wind_moon
                        } else {
                            icon.src = mist_moon
                        }
                    }





                })
        })
    }
})