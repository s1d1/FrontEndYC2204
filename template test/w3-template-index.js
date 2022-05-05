fetch("https://backendyc2204bezorging.azurewebsites.net/toonrestaurants/")
  .then((response) => response.json())
  .then((restaurants) => {
    const listEl = document.getElementById("restaurantlijst");
    
    let htmlString = "";
    restaurants.forEach((restaurant) => {
      htmlString += template(restaurant);
    });
    listEl.innerHTML = htmlString;
  });

// function template(data) {
//   return `
//     <li class = "border">
//       <a class="restitel" href="/menukaart.html?id=${data.id}">
//         <div>
//           <p class = naam>${data.naam}</p>
//           <p>${data.openingstijden}</p>
//           <p>${data.telefoonnummer}</p>
//           <p>${data.adres}</p>
//         </div>
//         <div>
//           <img class="plaatje" src="${data.gerechten[0].afbeelding}" />
//         </div>
//       </a>
//     </li>
//   `;

// }

function template(data) {
  return `
  <div class="flex-row restaurantlijstitem">
  <div class="flex-column">
      <h1><b>${data.naam}</b> </h1>
      <ul class="w3-ul w3-large">
          <li class="w3-text-grey w3-li "><span class="material-icons">
                  place
              </span>
  
              ${data.adres}</li>
          <li class="w3-text-grey w3-li"><span class="material-icons">
                  schedule
              </span> ${data.openingstijden}</li>
  
          <li class="w3-text-grey w3-li"><span class="material-icons">
                  phone
              </span>${data.telefoonnummer}</li>
      </ul>
  </div>
  <div> <img src="${data.gerechten[0].afbeelding}"></div>
  </div>
  `;
}
