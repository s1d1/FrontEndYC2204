class BezNav extends HTMLElement {
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
      <style>
        .header {
          position: sticky;
          background: linear-gradient(90deg, rgba(62,9,9,1) 0%, rgba(121,9,9,1) 40%, rgba(182,19,81,1) 91%);
          padding-top: 20px;
          padding-bottom: 20px;
          padding-left: 10px;
        }
      
        .header > h1 {
          color: rgb(230, 230, 230);
        }

        aside {
          background-color: green;
        }
      </style>
      <div class="header">
        <h1 id="restaurantnaam">${this.title}</h1>
      </div>
    `;
  }
}
customElements.define('bez-nav', BezNav);