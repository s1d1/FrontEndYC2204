function mandjeTemplate(data) {
  return `
    <ul>
      ${data.map((value) => {
        return `
          <li>
            <p>${value.hoeveelheid}x</p>
            <p>${value.naam}</p>
            <p>${value.prijs}</p>
            <p>${value.hoeveelheid * value.prijs}</p>
          </li>
        `;
      }).reduce((acc, curr) => `${acc}${curr}`)}
    </ul>
    <p>
    ${data.reduce((acc, curr) => {
      return acc + (curr.hoeveelheid * curr.prijs);
    }, 0)}
    </p>
    <button id="winkelmandje-clear">Leeg maken</button>
  `
}

export function renderWinkelmandje(id) {
  const winkelmandjeEl = document.getElementById('winkelmandje-container');
  const winkelmandjeData = localStorage.getItem('winkelmandje');
  
  let aantalItems = 0;
  let template;
  let data;

  if (
    winkelmandjeData && // <-- not null/undefined/false
    typeof JSON.parse(winkelmandjeData) === 'object' && // <-- {}
    typeof JSON.parse(winkelmandjeData)[id] === 'object' // <-- { 0: { .. } }
  ) {
    data = Object.values(JSON.parse(winkelmandjeData)[id]);
    aantalItems = data.length
  }

  if (aantalItems === 0) {
    template = `<p>Uw winkelmandje is nog leeg</p>`
  } else {
    template = mandjeTemplate(data)
  }

  winkelmandjeEl.innerHTML = template;
  if (aantalItems !== 0) {
    document.getElementById('winkelmandje-clear').addEventListener('click', clearWinkelmandje);
  }
}

export function setWinkelmandjeData(data) {
  localStorage.setItem('winkelmandje', data);
}

function clearWinkelmandje(id) {
  localStorage.setItem('winkelmandje', JSON.stringify({}));
  renderWinkelmandje();
}