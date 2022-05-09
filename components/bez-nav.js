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
      <div class="menukaart-header">
        <h1 class="menukaart-header-titel id="restaurantnaam">${this.title}</h1>
      </div>
    `;
  }
}
customElements.define('bez-nav', BezNav);