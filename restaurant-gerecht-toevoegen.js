

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

//fetch functie met lokale DUMMY data.
fetch("./data/restaurants.json")
    .then((response) => response.json())
    .then((restaurantdata) => {
        const restaurant = restaurantdata.find(restaurants => restaurants.id === restaurantid);

        var restaurantnaam = restaurant.naam;
        const bezNav = document.querySelector("bez-nav");
        console.log(restaurantnaam, bezNav);
        bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";


        const listEL = document.getElementById("gerechten");
        let htmlString = "";
        restaurant.gerechten.forEach((gerecht) => {
            htmlString += template_gerecht(gerecht);
        })
       // listEL.innerHTML = htmlString;

  

        // hier wordt de restaurantnaam opgehaald uit DATABASE en aan bezNav gegeven.
        // fetch("https://backendyc2204bezorging.azurewebsites.net/restaurantbyid/" + restaurantid)
        //     //fetch("https://localhost:8080/restaurantbyid/" + restaurantid)
        //     .then((response) => response.json())
        //     .then((restaurantdata) => {
        //         let restaurantnaam = restaurantdata.naam;
        //         const bezNav = document.querySelector("bez-nav");
        //         bezNav.title = restaurantnaam + " - Adminpagina - Gerechten toevoegen";
        //     })

        // hier worden de restaurantgerechten opgehaald uit DATABASE en in lijstitems gestopt.
        // fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
        //     //fetch("https://localhost:8080/toonmenu/" + restaurantid)
        //     .then((response) => response.json())
        //     .then((gerechtendata) => {
        //         const listEL = document.getElementById("gerechten");
        //         let htmlString = "";
        //         gerechtendata.forEach((gerecht) => {
        //             htmlString += template_gerecht(gerecht);
        //         })





        // Dit is het gerecht toevoegen formulier, dat aan het einde van de lijst met bestaande gerechten wordt gehangen.

        const FormEndpoint = "https://backendyc2204bezorging.azurewebsites.net/gerechttoevoegen/" + restaurantid;
        const FormNieuwGerecht =
            `
            <li class="flex-item">
                <div class="form">
                    <h2>Voeg nieuw gerecht toe:</h2>
                    <form id="form-gerecht-toevoegen">
                        <div class="formitem" id="form1">
                            <label for="gerechtnaam">
                                Naam gerecht:
                            <input type="text" id="gerechtnaam">
                            </label>
                        </div>
                        <div class="formitem" id="form2">
                            <label for="gerechtprijs">
                                Prijs:
                                <input type="text" id="gerechtprijs">
                            </label>
                        </div>
                        <div class="formitem"  id="form3">
                            <label for="gerechturl">
                                UMG-url:
                                <input type="text" id="gerechturl">
                            </label>
                        </div>
                        <input type="submit" value="Toevoegen">
                    </form>
                    
                        
                </div>
                <button onclick="testPost()">**test gerecht**</button>
            </li>
            `


        listEL.innerHTML = htmlString + FormNieuwGerecht;

})



// WIP: POST request met fetch
// referentie: https://stackoverflow.com/questions/39565706/post-request-with-fetch-api#39565776

window.testPost = function(){ // de functie testPost wordt hier gedefinieerd via window-object om het globaal te maken.
    console.log("Hallo dit is testPost")

    const url = 'https://backendyc2204bezorging.azurewebsites.net/gerechttoevoegen/' + restaurantid;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const body = JSON.stringify({
        naam: "Testgerecht",
        prijs: "6",
        afbeelding: "Testurl"
    });
    
    console.log(body)
    // fetch(url, options, body)
    //     .then (response => response.json())
    //     .then (response => console.log(response));
};
  
 