export class Password extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this._password = '';
	
	this._input = document.createElement('input');
	this._label = document.createElement('label');
	this._input.type = 'password';
    }

    static get observedAttributes() {
	return ['placeholder', 'minlength', 'required'];
    }

    attributeChangeCallback(name, oldValue, newValue) {
	if (name === 'placeholder') {
	    this._input.placeholder = newValue;
	}else if(name === 'minlength') {
	    this._input.minlength = newValue;
	}
    }
    
    connectedCallback() {
	this._input.placeholder = this.getAttribute('placeholder') || '';
	this._label.textContent = this.getAttribute('label') || '';
	this._input.name = this.getAttribute('name') || '';
	
	this._render();
	this._setupEventListener();
    }

    set value(value){
	this._password = value;
	this._input = this._password;
    }

    get value() {
	return this._password;
    }

    _render() {
	this.shadowRoot.innerHTML = `
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
           <link rel="stylesheet" type="text/css" href="assets/styles/password.css"/>           
           `;
	this._label.appendChild(this._input);
	this.shadowRoot.append(this._label);
    }

    _setupEventListener() {
	this._input.addEventListener('input', e => {
	    this._password = e.target.value;
	    this._dispatchChangeEvent();
	});
    }

    _dispatchChangeEvent() {
	this.dispatchEvent(new CustomEvent('password-change', {
	    bubbles: true,
	    composed: true,
	    detail: {
		value: this._password,
		name: this._input.name
	    },
	}));
    }
}

customElements.define('password-input', Password);
