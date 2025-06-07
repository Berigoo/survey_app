export class Select extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this._options_raw = '';
	this._selected = '';
	
	this._select = document.createElement('select');
	this._label = document.createElement('label');
	this._options = [];
    }

    static get observedAttributes() {
	return ['placeholder', 'selected', 'required'];
    }

    attributeChangeCallback(name, oldValue, newValue) {
	if (name === 'placeholder') {
	    this._select.ariaLabel = newValue;
	} else if (name === 'selected' && oldValue !== newValue) {
	    this._selected = newValue;
	}
    }
    
    connectedCallback() {
	this._select.ariaLabel = this.getAttribute('placeholder') || '';
	this._select.name = this.getAttribute('name') || '';
	
	this._label.textContent = this.getAttribute('label') || '';

	const defaultValue = this.getAttribute('default') || null;
	if(defaultValue) {
	    const option = document.createElement('option');
	    option.textContent = defaultValue;
	    option.selected = true;
	    option.disabled = true;
	    option.value = '';
	    this._options.push(option);
	}

	this._options_raw = JSON.parse(this.getAttribute('options').replace(/'/g, '"'));
	this._options_raw.forEach(raw => {
	    const option = document.createElement('option');
	    option.textContent = raw;
	    option.value = raw;
	    this._options.push(option);
	});

	if (this._options_raw.length > 0) {
	    this._selected = this._options_raw[0];
	}
	
	this._render();
	this._setupEventListener();
    }

    set options(value){
	this._options_raw = value;
    }

    get selected() {
	return this._selected;
    }

    _render() {
	this.shadowRoot.innerHTML = `
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
           <link rel="stylesheet" type="text/css" href="assets/styles/select-group.css"/>           
           `;

	this._options.forEach(option => {
	    this._select.appendChild(option);	    
	});
	this._label.appendChild(this._select);
	this.shadowRoot.append(this._label);
    }

    _setupEventListener() {
	this._select.addEventListener('change', (e) => {
	    this._selected = e.target.value;
	    this._dispatchChangeEvent();
	});
    }

    _dispatchChangeEvent() {
	this.dispatchEvent(new CustomEvent('select-change', {
	    bubbles: true,
	    composed: true,
	    detail: {
		selectedValue: this._selected,
		name: this._select.name
	    },
	}));
    }
}

customElements.define('select-group-input', Select);
