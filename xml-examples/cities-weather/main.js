
var request = new XMLHttpRequest() 

request.open('GET', 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json', true) 


request.onreadystatechange = function(){  
    if (request.readyState != 4){
        return;
    }

    var mass = JSON.parse(request.responseText);
        console.log(mass)

    var country=document.getElementById('country')
    var city=document.getElementById('city')
    var weather=document.getElementById('weather')
    var weather=document.getElementById('temperature')

    if (request.status == 200){
        alert('all ok')
    
       
        for(key in mass){
            var option = document.createElement('option')
            option.innerText = key;
            country.appendChild(option);
            
        }
        

        country.onchange = function(){
            city.innerText ='';

            for(i=0; i<mass[country.value].length; i++){
            var option2 = document.createElement('option');
            option2.innerText = mass[country.value][i];
            city.appendChild(option2);
            console.log(country.value); 

        city.onchange = function(){
            var reqW = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city.value +"') and u='c'"
            var requestW = new XMLHttpRequest();
            requestW.open('GET', "https://query.yahooapis.com/v1/public/yql?" + "q=" + encodeURIComponent(reqW) + "&format=json", true);
            requestW.onreadystatechange = function(){
                if(requestW.readyState !=4){
                    return;
                }
                if(requestW.status == 200){
                    alert('all ok2')
                    var weatherCity = JSON.parse(requestW.responseText);
                    console.log(weatherCity);

                var weatherParam=document.getElementById('weather');
                dayWeather = weatherCity.query.results.channel.item.forecast;
                var day = " ";
                console.log(weatherCity.query.results.channel.item.condition.text)
                for(i = 0; i < dayWeather.length; i++){
                    day += "<b>"+ dayWeather[i].day +" "+ dayWeather[i].date +"</b></br>" 
                        + "Temperature from " + dayWeather[i].low + " to " + dayWeather[i].high + "</br></br>";                
                } 
                weatherParam.style.border="2px solid red"
                weatherParam.style.backgroundColor="yellow"
                weatherParam.innerHTML ="восход " +  weatherCity.query.results.channel.astronomy.sunrise
                                    + "; закат " + weatherCity.query.results.channel.astronomy.sunset+ "</br></br>"
                                    + day;

                }   
                else {
                    alert('shit happens: ' +  requestW.status + ', ' + requestW.statusText );
                }
            }
            requestW.send();
        }
    }
          
            
        }
    }
  else {
        alert('shit happens: ' +  request.status + ', ' + request.statusText );
    }
}

request.send() 