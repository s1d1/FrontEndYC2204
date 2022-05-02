// bestellingid opslaan

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const bestellingid = parseInt(urlParams.get("id"), 10);


// fetch("https://backendyc2204bezorging.azurewebsites.net/toonmenu/" + restaurantid)
// .then((Response) => Response.json())
// .then((bestellingen) => {

//     const listEL = document.getElementById("bestellingen");
//     let htmlString = "";
//     bestellingen.forEach((bestelling) => {
//         htmlString += template(bestelling);
//     })
//     listEL.innerHTML = htmlString;

// })

// function template(bestelling) {
//     return `
//     <li class="flex-item">
//         <div>
//             <p>${bestelling.naam}</p>
//             <p>Prijs: € ${bestelling.prijs}</p>
//         </div>
//     </li>`
// }