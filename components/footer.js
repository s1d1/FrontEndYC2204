class Footer extends HTMLElement {
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
    <footer class="w3-center w3-black w3-padding-small w3-xxlarge" style="z-index:2; position: relative">
      <p class="footer-p">
        Powered by
        <a
          href="https://www.w3schools.com/w3css/default.asp"
          title="W3.CSS"
          target="_blank"
          class="w3-hover-text-green footer-p"
          >w3.css</a
        >
      </p>
    </footer>
      `;
    }
  }
  customElements.define('bez-footer', Footer);