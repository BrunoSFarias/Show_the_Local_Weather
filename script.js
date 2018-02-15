$(function(){
  var apiKey = 'c66ce389498685b7e056d6e9f86891f7';  
  var api="http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c66ce389498685b7e056d6e9f86891f7"; 
    

  // deixei no true
  var cel =true; 
  var apiData;
  var data;
  var id;

    function displayTemp(fTemp, c){
    if (c) return Math.round((fTemp-32)*(5/9)) + '&deg; C';//if c===true "cel" being passed into fuction "c"
    return Math.round(fTemp) + '&deg; F'
  }

  function render(data, cel){
             var currentLocation=data.name;
              var currentWeather=data.weather[0].description;
              var currentTemp= displayTemp (data.main.temp,cel);
              var high=data.main.temp_max;
              var low= data.main.temp_min;
              var wind=(2.237*(data.wind.speed)).toFixed(1);
              var humidity= data.main.humidity;
              var icon=  data.weather[0].icon
              var apiData=data;
                              
              $('#currentTemp').html(currentTemp);
              $('#currentWeather').html(currentWeather);
              $('#max').html(high);
              $('#min').html(low);
              $('#wind').html(wind+" mph");
              $('#humidity').html(humidity);
              
                 
              var iconSrc= "http://openweathermap.org/img/w/" + icon + ".png"; // get icon code and insert onto end of html +.png to get correct img
                
              $('#currentTemp').prepend('<img src=' + iconSrc + '>') //Prepend to add icon
}

 backgroundImg = ['http://res.cloudinary.com/burnovb/image/upload/v1507154587/stormly_txj3nk.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/v1507154649/rain_rhas9o.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/v1507154731/rain2_h2ibit.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/v1508090005/snow_atufzp.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/v1508090079/foggy_stuqdy.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/v1508090177/sunny_hufb1d.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/v1508090271/cloud_sky_xdid9i.png', 
  'http://res.cloudinary.com/burnovb/image/upload/v1508090338/cloudly_y46rdo.jpg',
 'http://res.cloudinary.com/burnovb/image/upload/c_scale,q_90,w_3000/v1508090394/broken_clouds_iu1pu0.jpg',
   ];

   $.getJSON('https://freegeoip.net/json/').done (function(location)
     {
         $('#country').html(location.country_name);
          $('#country_code').html(location.country_code);
          $('#region').html(location.region_name);
          $('#region_code').html(location.region_code);
          $('#city').html(location.city);
          $('#latitude').html(location.latitude);
          $('#longitude').html(location.longitude);
          $('#timezone').html(location.time_zone);
          $('#ip').html(location.ip);
          
          
   
         // lat=location.latitude; don't need separate avriables/redundant
          //long=location.longitude;
    
          //console.log(lat);
   
     // a função a seguir é para o background do tempo
     // $.getJSON(link do api, função do background)
     $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=9376beae156137001bb4cf7ce56b7e40', function(data){//--->USE HTTPS^

                //console.log(data);//Success!!!

                apiData=data;
                
                render (apiData,cel);
                
                $('#toggle').click(function(){
                    cel = !cel;
                    render(data,cel);          
                })
               
                var  id = data.weather[0].id,
                    bgIndex,
                   backgroundId = [299, 499, 599, 699, 799, 800, 801, 802, 803]; // beats if else loops! corisponds to index numbers from api
                
                  backgroundId.push(id);
                  bgIndex = backgroundId.sort().indexOf(id);
                    
              console.log(id);
                $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')').css('background-color','#2a2a2a').css('background-repeat', 'no-repeat').css('background-position', 'center').css('background-size', 'auto cover'); //this works with munual input...
                
               });
   
   
   
   //alert(location.region_name); // test information

   
     });
  
  
  
  
})