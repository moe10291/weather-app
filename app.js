window.addEventListener('load', ()=>{
    let long;
    let lat;
    let tempratureDescription= document.querySelector('.temprature-description');
    let tempratureDegree= document.querySelector('.temprature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let tempratureSection= document.querySelector('.temprature');
    const tempratureSpan= document.querySelector('.temprature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat= position.coords.latitude;
            long= position.coords.longitude;

            const proxy= 'http://cors-anywhere.herokuapp.com/'

            const api= `${proxy}https://api.darksky.net/forecast/4b7f2d7b6781c0bf8f322478f9d100a3/${lat}, ${long}`
            console.log('IM HERE', api)
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                console.log(data)
                const {temperature, summary, icon}= data.currently;
                //Set DOM elements from the API

                tempratureDegree.textContent= temperature;
                tempratureDescription.textContent= summary;
                locationTimezone.textContent= data.timezone;
                // Formula for Celcius

                let celsius= (temperature-32)* (5/9)
                
                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // change F to C onClick
                tempratureSection.addEventListener('click', ()=>{
                    if(tempratureSpan.textContent === 'F'){
                        tempratureSpan.textContent= 'C';
                        tempratureDegree.textContent= Math.floor(celsius);
                    }else {
                        tempratureSpan.textContent= 'F';
                        tempratureDegree.textContent= temperature;
                    }
                })
            });

        });

    } 

    else {
        alert('Sorry, we are unable to find your location')
    }

    function setIcons(icon, iconID){
        const skycons= new Skycons({color: "white"});
        const currentIcon= icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});
