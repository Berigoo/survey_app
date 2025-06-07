export class TextInput extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this._value = '';
	
	this._input = document.createElement('input');
	this._label = document.createElement('label');
	this._input.type = 'text';
    }

    static get observedAttributes() {
	return ['placeholder', 'required'];
    }

    attributeChangeCallback(name, oldValue, newValue) {
	if (name === 'placeholder') {
	    this._input.placeholder = newValue;
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
	this._value = value;
	this._input = this._value;
    }

    get value() {
	return this._password;
    }

    _render() {
	this.shadowRoot.innerHTML = `
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
           <link rel="stylesheet" type="text/css" href="assets/styles/inputText.css"/>           
           `;
	this._label.appendChild(this._input);
	this.shadowRoot.append(this._label);
    }

    _setupEventListener() {
	this._input.addEventListener('input', (e) => {
	    this._value = e.target.value;
	    this._dispatchChangeEvent();	    
	});
    }

    _dispatchChangeEvent() {
	this.dispatchEvent(new CustomEvent('text-change', {
	    bubbles: true,
	    composed: true,
	    detail: {
		value: this._value,
		name: this._input.name
	    },
	}));
    }
}

customElements.define('text-input', TextInput);
