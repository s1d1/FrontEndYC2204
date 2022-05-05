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
      <div class="w3-top">
      <div class="flex-row w3-bar w3-xlarge w3-black w3-grayscale-max w3-opacity w3-hover-opacity-off" id="myNavbar">
         
              <a href="#" class="w3-bar-item w3-button"><span class="material-icons w3-xxlarge">
                      home
                  </span></a>
              <a href="#restaurants" class="w3-bar-item w3-button">Restaurants</a>
              <a href="#info" class="w3-bar-item w3-button">Over ons</a>
       

              <a href="#" class="w3-bar-item w3-button">Inloggen</a>
              <a href="#" class="w3-bar-item w3-button"><span class="material-icons w3-xxlarge">
                      shopping_bag
                  </span></a>
              
  
      </div>
  </div>
      `;
    }
  }
  customElements.define('w3-navbar', w3NavBar);