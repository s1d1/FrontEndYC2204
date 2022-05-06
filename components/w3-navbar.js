class w3NavBar extends HTMLElement {
    static get observedAttributes() { 
      return ['title'];
    }
  
    get title() {
      return this.getAttribute('title') || '';
    }
  
    set title(value) {
      this.setAttribute('title', value);
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'title') {
        this.render();
      } 
    }
  
    render() {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="w3-template.css">
      <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

      <div class="w3-top">
      <div class="flex-row w3-bar w3-xlarge w3-black w3-grayscale-max w3-opacity w3-hover-opacity-off" id="myNavbar">
         
              <a href="index.html" class="w3-bar-item w3-button"><span class="material-icons w3-xxlarge">
                      home
                  </span></a>
              <a href="overzicht-restaurants.html" class="w3-bar-item w3-button">Restaurants</a>
              <a href="#infoblok" class="w3-bar-item w3-button">Over ons</a>
       

              <a href="#" class="w3-bar-item w3-button">Inloggen</a>

              
  
      </div>
  </div>
      `;
    }
  }
  customElements.define('w3-navbar', w3NavBar);


// HTML voor winkelmandje icoon

//   <a href="#" class="w3-bar-item w3-button"><span class="material-icons w3-xxlarge">
//   shopping_bag
// </span></a>