fetch("https://backendyc2204bezorging.azurewebsites.net/toonrestaurants")
.then((Response) => Response.json())
.then((data) => {
    const restaurants = data;

    console.log(restaurants)

    const dropdownEl = document.getElementById("dropdown");
    dropdownEl.innerHTML = template_dropdown();

    const dropdownLink = document.getElementById("restaurants");
    let htmlLink = "";

    restaurants.forEach((restaurant) => {
    htmlLink += template_dropdownLink(restaurant);
    });

    dropdownLink.innerHTML = htmlLink;
});

function template_dropdown() {
    return `
    <form action="/restaurant-admin.html" method="get" class="dropdown">
        <label for="restaurants" class="label w3-large">Kies een restaurant:</label>
        <select name="id" id="restaurants" class="select w3-large">
        </select>
        <input type="submit" value="Selecteer dit restaurant" class="submit w3-button w3-large" style="padding: 0px 5px 0px 5px;">
    </form>
  `
}

function template_dropdownLink(restaurant) {
    return `
    <option value="${restaurant.id}">${restaurant.naam}</option>
  `
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

if (isNaN(restaurantid)) {
    const gekozenEl = document.getElementById("gekozen");
    gekozenEl.innerHTML = "<p>Kies een restaurant.</p>";
} 
else {
    fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
    .then((Response) => Response.json())
    .then((data) => {
        const restaurant = data;
        const gekozenEl = document.getElementById("gekozen");
        gekozenEl.innerHTML = template_gekozen(restaurant);
    });
    
    function template_gekozen(restaurant) {
        return `
        <p class="w3-large">U heeft <span class="w3-text-teal">${restaurant.naam}</span> gekozen.</p>
        `
    } 
}

