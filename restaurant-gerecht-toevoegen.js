// Haalt naam restaurant op op basis van query
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const restaurantid = urlParams.get("id");
// fetch("http://localhost:8080/restaurantbyid/" + restaurantid)
//     .then((Response) => Response.json())
//     .then((data) => {
//     var restaurantnaam = data.naam;
//     document.getElementById("restaurantnaam").innerHTML +=
//         "Menukaart " + restaurantnaam;
//     });

fetch("./data/restaurants.json")
.then((response) => response.json())
.then((restaurants) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const restaurantid = parseInt(urlParams.get("id"), 10);
    const restaurant = restaurants.find(restaurants => restaurants.id === restaurantid);

    var restaurantnaam = restaurant.naam;
    const h1 = document.getElementById("restaurantnaam");
    let h1String = "Adminpagina: ";
    h1String += restaurantnaam;
    h1.innerHTML = h1String;


    const listEL = document.getElementById("gerechten");
    let htmlString = "";
    restaurant.gerechten.forEach((gerecht) => {
        htmlString += template_gerecht(gerecht);
    })
    listEL.innerHTML = htmlString;
})


function template_gerecht(gerecht) {
    return `
    <li class="flex-item">
    <div>
    <p>${gerecht.naam}</p>
    <p>Prijs €: ${gerecht.prijs}</p>
    </div>

    <img src=${gerecht.afbeelding}>
    <button onclick=rmgerecht()>Verwijder</button>
    </li>`
}