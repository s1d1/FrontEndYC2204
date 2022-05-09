

// VARIABELEN: haalt restaurantid op uit url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

// TEMPLATE: gerechtenitems
function template_gerecht(gerecht) {
    return `
    <li class="flex-item">
        <div>
            <p>Naam: ${gerecht.naam}</p>
            <p>Prijs: € ${gerecht.prijs}</p>
            <p>IMG-url: ${gerecht.afbeelding}</p>
        </div>

        <div>
            <img src=${gerecht.afbeelding}>
        </div> 
        <button onclick="deleteGerecht(${gerecht.id})">
            Verwijderen
        </button> 

    </li>`

}

//FUNCTIE: gerecht verwijderen

window.deleteGerecht = function (gerechtid) {
    console.log("Hallo dit is deleteGerecht()");

    const url = 'http://backendyc2204bezorging.azurewebsites.net/gerechtverwijderen/' +  gerechtid;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, options)
        .then(response => console.log(response))

}

// FUNCTIE: restaurantnaam ophalen en aan beznav geven
fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
    //fetch("https://localhost:8080/restaurantbyid/" + restaurantid)
    .then((response) => response.json())
    .then((restaurant) => {
        let restaurantnaam = restaurant.naam;
        const bezNav = document.querySelector("bez-nav");
        bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";
    })


// FUNCTIE: gerechten van restaurant ophalen en in menulijst stoppen
fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
    //fetch("https://localhost:8080/toonmenu/" + restaurantid)
    .then((response) => response.json())
    .then((gerechtendata) => {
        const listEL = document.getElementById("gerechten");
        let htmlString = "";
        gerechtendata.forEach((gerecht) => {
            htmlString += template_gerecht(gerecht);
        })
        listEL.innerHTML = htmlString;
    })



// FUNCTIE: testpost met fetch
// referentie: https://stackoverflow.com/questions/39565706/post-request-with-fetch-api#39565776

window.testPost = function () { // de functie testPost wordt hier gedefinieerd via window-object om het globaal te maken. 
    //Hij wordt geactiveerd met onclick op button.
    console.log("Hallo dit is testPost()");

    const url = 'http://backendyc2204bezorging.azurewebsites.net/gerechttoevoegen/' + restaurantid;

    const nieuwGerecht = {
        "naam": "Testaardappel9",
        "prijs": 999,
        "afbeelding": "https://cipotato.org/wp-content/uploads/2020/03/potatoes.jpg"
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(nieuwGerecht),
        headers: {
            'Content-Type': 'application/json'
        },
    };


    console.log(nieuwGerecht)
    fetch(url, options)
        .then(response => console.log(response))

};

// FUNCTIE: formulierdata posten met fetch
// referentie: https://code-boxx.com/post-form-data-javascript-fetch/#sec-post

window.sendData = function () {
    //e.preventDefault();




    // A GET FORM DATA
    let rawData = new FormData();
    rawData.append("naam", document.getElementById("gerechtnaam").value);
    rawData.append("prijs", document.getElementById("gerechtprijs").value);
    rawData.append("afbeelding", document.getElementById("gerechturl").value);

    // snippet om fordata te converteren in JSON
    const data = {};
    rawData.forEach((value, key) => (data[key] = value));
    console.log(data);




    const url = 'http://backendyc2204bezorging.azurewebsites.net/gerechttoevoegen/' + restaurantid;

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };
    // B INIT FETCH POST
    fetch(url, options)
        .then((response) => console.log(response))


    return false;
}

