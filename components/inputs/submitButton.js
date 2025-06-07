export class SubmitButton extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	const type = "submit";
	
	const input = document.createElement('input');

	input.type = type;
	input.id = 'submit-btn';

	this._input = input;
    }

    connectedCallback() {
	const value = this.getAttribute('value') || '';
	this._input.value = value;
	
	this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
        <link rel="stylesheet" type="text/css" href="assets/styles/submitButton.css"/>
    `;
	this.shadowRoot.append(this._input);

	this._setupEventListener();
    }

    _setupEventListener() {
	this._input.addEventListener('click', (e) => {
	    this.shadowRoot.dispatchEvent(new CustomEvent('submit-invoked', {
		bubbles: true,
		composed: true,
		detail:{
		    timestamp: Date.now()
		}
	    }))
	});
    }
}

customElements.define('submit-button-input', SubmitButton);
