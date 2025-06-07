import {TextInput} from "./inputs/inputText.js"
import {SubmitButton} from "./inputs/submitButton.js"
import {Radios} from "./inputs/radio.js"
import {Password} from "./inputs/password.js"
import {Select} from "./inputs/select.js"

export class RegisterInterface extends HTMLElement {
    constructor() {
	super();
	this.attachShadow({ mode: 'open' });

	this._data = {
	    gender: null,
	    email: null,
	    password: null,
	    password_confirmation: null,
	    name1: null,
	    name2: null,
	    job: null,
	    ed: null,
	    province: null,
	    bdate: null
	};
    }

    connectedCallback() {
	this._render();
    }
    
    _render() {
	fetch(`templates/register.html`).then(res => {
	    res.text().then(e => {
		this.shadowRoot.innerHTML = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>`;
		this.shadowRoot.innerHTML += e;

		this._setupEventListener();
	    });
	});
    }

    _setupEventListener() {
	this.shadowRoot.addEventListener('submit-invoked', e => {
	    alert(`email: ${this._data.email}, password: ${this._data.password}, date: ${this._data.bdate}, nama_depan: ${this._data.name1}, nama_belakang: ${this._data.name2}, ed: ${this._data.ed}, gender: ${this._data.gender}`);
	});

	this.shadowRoot.addEventListener('text-change', e => {
	    if (e.detail.name === 'email') {
		this._data.email = e.detail.value || null;
	    } else 	    if (e.detail.name === 'name1') {
		this._data.name1 = e.detail.value || null;
	    } else 	    if (e.detail.name === 'name2') {
		this._data.name2 = e.detail.value || null;
	    } else 	    if (e.detail.name === 'bdate') {
		this._data.bdate = e.detail.value || null;
	    }
	});

	this.shadowRoot.addEventListener('select-change', e => {
	    if (e.detail.name === 'provinsi') {
		this._data.province = e.detail.selectedValue || null;
	    } else 	    if (e.detail.name === 'pendidikan_terakhir') {
		this._data.ed = e.detail.selectedValue || null;
	    } else 	    if (e.detail.name === 'pekerjaan') {
		this._data.job = e.detail.selectedValue || null;
	    } 
	});

	this.shadowRoot.addEventListener('radio-change', e => {
	    if (e.detail.name === 'jenis_kelamin') {
		this._data.gender = e.detail.selectedValue || null;
	    }
	});

	this.shadowRoot.addEventListener('password-change', e => {
	    if (e.detail.name === 'password') {
		this._data.password = e.detail.value || null;
	    } else 	    if (e.detail.name === 'password_confirmation') {
		this._data.password_confirmation = e.detail.value || null;
	    }
	});

	this.shadowRoot.getElementById('to-login').addEventListener('click', (e) => {
	    this.dispatchEvent(new CustomEvent('login-register:toggle_page', {
		bubbles: true,
		composed: true,
		detail: {
		    to: 'login'
		}
	    }));
	});
	
    }
    
}

customElements.define('register-interface', RegisterInterface);
