class Infoblok extends HTMLElement {
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
      <div class="w3-container w3-padding-64 w3-blue-grey w3-xlarg" id="infoblok">
      <div class="w3-content">
        <div>
          <div>
            <h3><strong>Ons verhaal:</strong></h3>
            <p class="info-p">
              Bezorgdienst is ontstaan vanuit de behoefte van restaurants en
              bezorgers om samen te komen onder één platform. Bezorgdienst is
              een service waar zowel klanten, restaurants en bezorgers samen
              kunnen komen en waar klanten snel en eenvoudig bij hun favoriete
              restaurants kunnen bestellen. Bezorgdienst is een product gemaakt
              door vier programmeurs met verschillende achtergronden. Dankzij
              deze diversiteit is Bezorgservice een complete en
              gebruiksvriendelijke applicatie.
            </p>
          </div>
        </div>
        <div class="flex-row flex-wrap">
          <div>
            <h3><strong>Volg ons op social media:</strong></h3>
            <a href="https://www.facebook.com/" target="_blank"
              ><p class="info-p"><span class="w3-tag">Facebook</span></p></a
            >
            <a href="https://www.Twitter.com/" target="_blank"
              ><p class="info-p"><span class="w3-tag">Twitter</span></p></a
            >
            <a href="https://www.Instagram.com/" target="_blank"
              ><p class="info-p"><span class="w3-tag">Instagram</span></p></a
            >
          </div>
          <div>
            <h3><strong>Samenwerken met bezorgdienst:</strong></h3>
            <a href="#">
              <p class="info-p">
                <span class="w3-tag">Je restaurant toevoegen</span>
              </p></a
            >
            <a href="#">
              <p class="info-p">
                <span class="w3-tag">Aanmelden als bezorger</span>
              </p></a
            >
          </div>
        </div>
      </div>
    </div>

      `;
    }
  }

  customElements.define('bez-infoblok', Infoblok);