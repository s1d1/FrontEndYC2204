

// haalt restaurantid op uit url.
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurantid = parseInt(urlParams.get("id"), 10);

// template voor lijstitems van gerechten
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
        <button>
            Verwijderen
        </button> 

    </li>`

}

// fetch functie met lokale DUMMY data.
fetch("./data/restaurants.json")
  
    .then((response) => response.json())
    .then((restaurantdata) => {
        const restaurant = restaurantdata.find(restaurant => restaurant.id === restaurantid);

        var restaurantnaam = restaurant.naam;
        const bezNav = document.querySelector("bez-nav");
        console.log(restaurantnaam, bezNav);
        bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";


        const listEL = document.getElementById("gerechten");
        let htmlString = "";
        restaurant.gerechten.forEach((gerecht) => {
            htmlString += template_gerecht(gerecht);
            console.log(gerecht);
        })

        listEL.innerHTML = htmlString;
    })


        // hier wordt de restaurantnaam opgehaald uit DATABASE en aan bezNav gegeven.
    //     fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
    //         //fetch("https://localhost:8080/restaurantbyid/" + restaurantid)
    //         .then((response) => response.json())
    //         .then((restaurant) => {
    //             let restaurantnaam = restaurant.naam;
    //             const bezNav = document.querySelector("bez-nav");
    //             bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";
    //         })
            

    //  //   hier worden de restaurantgerechten opgehaald uit DATABASE en in lijstitems gestopt.
    //     fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
    //         //fetch("https://localhost:8080/toonmenu/" + restaurantid)
    //         .then((response) => response.json())
    //         .then((gerechtendata) => {
    //             const listEL = document.getElementById("gerechten");
    //             let htmlString = "";
    //             gerechtendata.forEach((gerecht) => {
    //                 htmlString += template_gerecht(gerecht);
    //             })
    //             listEL.innerHTML = htmlString;
    //                })



// WIP: POST request met fetch
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

// SAMPLE post form data met javascript
// referentie: https://code-boxx.com/post-form-data-javascript-fetch/#sec-post

window.sendData = function () {
   //e.preventDefault();


    // A GET FORM DATA
    let formdata = new FormData();
    formdata.append("naam", document.getElementById("naam1").value);
    formdata.append("prijs", document.getElementById("prijs1").value);
    formdata.append("afbeelding", document.getElementById("afbeelding1").value);

    // snippet om formdata te inspecteren in console.log 
    console.log("Formuliergegevens:")
    for(var pair of formdata.entries()) {  
        console.log(pair[0]+ ', '+ pair[1]); 
    }
    return false;
//     const url = 'http://backendyc2204bezorging.azurewebsites.net/gerechttoevoegen/' + restaurantid;

//     const options = {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     };
//     // B INIT FETCH POST
//     fetch(url, options)
//         .then((result) => {
//            console.log(response)
//         })
}