fetch("./data/restaurants.json")
  .then((response) => response.json())
  .then((restaurants) => {
    const listEl = document.getElementById("list");

    // for (int i = 0; i < arr.length; i++) {
    //   arr[i] // item
    // }

    // for (Item item : arr) {
    //   System.print.out(item.naam)
    // }

    // for (let i = 0; i < arr.length; i++) {
    //   arr[i] // item
    // }

    // for (let [item, index] of arr) {

    // }

    // arr.forEach((item) => {
    //   console.log(item)
    // })

    let htmlString = "";
    restaurants.forEach((restaurant) => {
      htmlString += template(restaurant);
    });
    listEl.innerHTML = htmlString;
  });

function template(data) {
  return `
    <li>
      <p>${data.naam}</p>
      <p>${data.adres}</p>
      <ul>
        ${data.gerechten.map(
          (gerecht) => `
          <li>
            <p>${gerecht.naam}</p>
            <p>${gerecht.prijs}</p>
            <img src="${gerecht.afbeelding}" />
          </li>
        `
        )}
      </ul>
    </li>
  `;
}
