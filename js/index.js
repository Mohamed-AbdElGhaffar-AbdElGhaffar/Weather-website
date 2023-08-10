let navLinks = Array.from( document.querySelectorAll("body .navbar .navbar-nav .nav-item .nav-link"));
let output = document.getElementById("output");
for(let i=0;i<navLinks.length;i++){
    navLinks[i].addEventListener("click", function(){
        let linkActive = document.querySelector("body .navbar .navbar-nav .nav-item .active");
        linkActive.classList.remove("active")
        navLinks[i].classList.add("active")
    });
}

let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", a=>{getNews(a.target.value) });
document.getElementById("searchButton").addEventListener("click", ()=>{getNews(searchInput.value) });




let currentPosts = [];
let locationPosts = [];
let forecastPosts = [];




async function getNews(country="cairo"){
    let apiRespone = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b5c13764139e4eb6ba9172853230808&q=${country}&days=7`);
    let allPosts = await apiRespone.json();
    currentPosts = allPosts.current;
    locationPosts = allPosts.location;
    forecastPosts = allPosts.forecast;
    disblay();
}





function disblay(){
    let time = currentPosts.last_updated;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let timeNow = new Date(time.replace(" ", "T"))
    let secondDay = new Date(forecastPosts.forecastday[1].date);
    let thirdDay = new Date(forecastPosts.forecastday[2].date);
    let name = locationPosts.name;
    let month = timeNow.getDate() + monthNames[timeNow.getMonth()]

    let box = `
              <div class="Siction-1-1 col-lg-4 col-md-12">
                <div class="Siction-1-1-1 d-flex justify-content-between">
                  <h2>${days[timeNow.getDay()]}</h2>
                  <h2 id="month">${month}</h2>
                </div>
                <div class="outputFirstDay text-start" id="outputFirstDay">
                  <h3>${name}</h3>
                  <div class="d-flex align-items-center">
                    <p class="num mb-0">${currentPosts.temp_c}<sup>o</sup>C</p>
                    <div class="icon">
                      <img src="https:${currentPosts.condition.icon}" alt="">
                    </div>
                  </div>
                  <h4 class="condition">${currentPosts.condition.text}</h4>
                  <div class="icons w-100 d-flex align-items-center">
                    <div class="d-flex">
                      <img src="img/icon-umberella.png" alt="umberella">
                      <p>20%</p>
                    </div>
                    <div class="d-flex">
                      <img src="img/icon-wind.png" alt="wind">
                      <p>18km/h</p>
                    </div>
                    <div class="d-flex">
                      <img src="img/icon-compass.png" alt="compass">
                      <p>East</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="Siction-1-2 col-lg-4 col-md-12">
                <div class="Siction-1-1-1 text-center">
                  <h2>${days[secondDay.getDay()]}</h2>
                </div>
                <div class="Siction-1-2-1 text-center">
                  <img src="https:${forecastPosts.forecastday[1].day.condition.icon}" alt="" width="48px" height="48pxs">
                  <p class="maxNum mb-0">${forecastPosts.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                  <p class="minNum mb-0">${forecastPosts.forecastday[1].day.mintemp_c}<sup>o</p>
                  <h4 class="condition">${forecastPosts.forecastday[1].day.condition.text}</h4>
                </div>
              </div>
              <div class="Siction-1-3 col-lg-4 col-md-12">
                <div class="Siction-1-1-1 text-center">
                  <h2>${days[thirdDay.getDay()]}</h2>
                </div>
                <div class="Siction-1-2-1 text-center">
                  <img src="https:${forecastPosts.forecastday[2].day.condition.icon}" alt="" width="48px" height="48pxs">
                  <p class="maxNum mb-0">${forecastPosts.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                  <p class="minNum mb-0">${forecastPosts.forecastday[2].day.mintemp_c}<sup>o</p>
                  <h4 class="condition">${forecastPosts.forecastday[2].day.condition.text}</h4>
                </div>
              </div>









    `;

    output.innerHTML=box;

}

getNews();


