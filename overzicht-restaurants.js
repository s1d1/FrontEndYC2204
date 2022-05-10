fetch("https://backendyc2204bezorging.azurewebsites.net/toonrestaurants/")
  .then((response) => response.json())
  .then((restaurants) => {
    const listEl = document.getElementById("list");
    
    let htmlString = "";
    restaurants.forEach((restaurant) => {
      htmlString += template(restaurant);
      console.log(restaurant.gerechten[0]);
    });
    listEl.innerHTML = htmlString;
  });

function template(data) {
  return `
    <li class = "border">
      <a class="restitel" href="/menukaart.html?id=${data.id}">
        <div>
          <p class="restaurantnaam">${data.naam}</p>
          <p>Openingstijden: ${data.openingstijden}</p>
          <p>Telefoonnummer: ${data.telefoonnummer}</p>
          <p>Adres: ${data.adres}</p>
        </div>
        <div>
        <img class="plaatje" src="${data.gerechten[0].afbeelding}" />
        </div>
      </a>
    </li>
  `;

}
