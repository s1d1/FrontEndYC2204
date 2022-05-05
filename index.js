// Javascript voor restaurantlijst 
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

function template(data) {
  return `
  <div class="flex-row restaurantlijstitem">
    <div class="flex-column">
        <h1><b>${data.naam}</b> </h1>
        <ul class="w3-ul w3-large">
            <li class="w3-text-grey w3-li li-item"><a href="http://maps.google.com/?q=${data.adres}" target="blank" style="text-decoration: none"><span class="material-icons">place</span>${data.adres}</a></li>
            <li class="w3-text-grey w3-li li-item"><span class="material-icons">
                    schedule
                </span>${data.openingstijden}</li>
    
            <li class="w3-text-grey w3-li li-item"><a href="tel:${data.telefoonnummer}" style="text-decoration: none"><span class="material-icons">
                    phone
                </span>${data.telefoonnummer}</a></li>
        </ul>
    </div>
    <div class="image-box"><a href="menukaart.html?id=${data.id}"> <img src="${data.logo}"></a></div>
  </div>
  `;
}