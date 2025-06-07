import {Password} from "./inputs/password.js"
import {TextInput} from "./inputs/inputText.js"
import {SubmitButton} from "./inputs/submitButton.js"

export class LoginInterface extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this._data = {
	    email: null,
	    password: null
	};
    }

    connectedCallback() {
	this._render();
    }
    
    _render() {
	fetch(`templates/login.html`).then(res => {
	    res.text().then(e => {
		this.shadowRoot.innerHTML = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>`;
		this.shadowRoot.innerHTML += e;

		this._setupEventListener();
	    });
	});
    }

    _setupEventListener() {
	this.shadowRoot.addEventListener('submit-invoked', e => {
	    alert(`email: ${this._data.email}, password: ${this._data.password}`);
	});

	this.shadowRoot.addEventListener('text-change', e => {
	    if (e.detail.name === 'email') {
		this._data.email = e.detail.value || null;
	    }
	});

	this.shadowRoot.addEventListener('password-change', e => {
	    if (e.detail.name === 'password') {
		this._data.password = e.detail.value || null;
	    }
	});


	this.shadowRoot.getElementById('to-daftar').addEventListener('click', (e) => {
	    this.dispatchEvent(new CustomEvent('login-register:toggle_page', {
		bubbles: true,
		composed: true,
		detail: {
		    to: 'register'
		}
	    }));
	});
    }
    
}

customElements.define('login-interface', LoginInterface);
