export class Radios extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this._options = [];
	this._selected = null;
	this._name = '';

	this._radios = [];
    }

    static get observedAttributes() {
	return ['name', 'selected', 'options'];
    }

    attributeChangeCallback(name, oldValue, newValue) {
	if (name === 'selected' && oldValue !== newValue) {
	    this._selected = newValue;
	    this._updateRadioStates();
	}else if(name === 'name') {
	    this._name = newValue;
	}else if(name === 'options') {
	    this._options = newValue;
	}
    }
    
    connectedCallback() {
	this._name = this.getAttribute('name') || String(Math.floor(Math.random() * 101));
	this._options = this.getAttribute('options') || [];
	this._options = JSON.parse(this._options.replace(/'/g, '"'));
	
	this._render();
	this._setupEventListener();
    }

    set options(value){
	this._options = value;
	this._render();
    }

    get selected() {
	return this._selected;
    }

    _render() {
	const legend = document.createElement('legend');
	legend.textContent = this.getAttribute('title') || 'title';

	const labels = [];

	this._options.forEach(option => {
	    const radio = document.createElement('input');
	    radio.type = 'radio';
	    radio.id = option;
	    radio.name = this._name;
	    const label = document.createElement('label');
	    label.htmlFor = option;
	    label.textContent = option;
	    
	    this._radios.push(radio);
	    labels.push(label);
	});

	this.shadowRoot.innerHTML = `
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
           <link rel="stylesheet" type="text/css" href="assets/styles/radio-group.css"/>           
           `;
	this.shadowRoot.append(legend);
	const div = document.createElement('div');
	for(var i=0; i<this._radios.length; i++){
	    div.appendChild(this._radios[i]);
	    div.appendChild(labels[i]);
	}
	this.shadowRoot.append(div);
    }

    _setupEventListener() {
	this._radios.forEach(radio => {
	    radio.addEventListener('change', e => {
		if(e.target.checked) {
		    this._selected = e.target.id;
		    this._dispatchChangeEvent();
		}
	    })
	})
    }

    _dispatchChangeEvent() {
	this.dispatchEvent(new CustomEvent('radio-change', {
	    bubbles: true,
	    composed: true,
	    detail: {
		selectedValue: this._selected,
		name: this._name,
	    },
	}));
    }

    _updateRadioStates() {
	const radios = this.shadowRoot.querySelectorAll('input[type="radio"]');
	radios.forEach(radio => {
	    radio.checked = (radio.value === this._selected);
	});
    }
    
}

customElements.define('radio-group-input', Radios);
