/*
	Spread the Word
	Andres Basile GNU/GPL v3
*/

const StW = {
	/* Start engine up. */
	start() {
		this.index = 'README.md';
		this.buttons = ["menu", "back", "fullscreen"];
		this.options = {
			'font_family': ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'math', 'fangsong'],
			'font_size': ['16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px'],
			'max_width': ['50ch', '60ch', '70ch', '80ch'],
			'background_color': [],
			'color': []
		};
		this.path = '';
		this.page = null;
		this.history = [];
		this.default = {};
		this.e = {};

		/* Set style options from user saved or defaults. */
		for (const key of Object.keys(this.options)) {
			let val = this.cache_get(key);
			if (val == null) {
				val = getComputedStyle(document.documentElement).getPropertyValue('--' + key).trim();
			}
			else {
				document.documentElement.style.setProperty('--' + key, val);
			}
			this.default[key] = val;
		}

		/* Get all elements from layout. */
		for (const key of ["bar", "info", "content", "menu_panel"]
				.concat(this.buttons)
				.concat(Object.keys(this.options))) {
			this.e[key] = document.getElementById(key);
		}

		/* Initialize buttons. */
		for (const key of this.buttons) {
			this.e[key].onclick = this[key].bind(this);
		}
		this.e.back.disabled = true;
		document.onfullscreenchange = this.windowed.bind(this);

		/* Initialize selects and inputs. */
		for (const key of Object.keys(this.options)) {
			for (const idx in this.options[key]) {
				const val = this.options[key][idx];
				const e = document.createElement('option');
				e.innerHTML = val;
				e.value = val;
				this.e[key].append(e);
				if (val == this.default[key]) {
					this.e[key].selectedIndex = idx;
				}
			}
			this.e[key].value = this.default[key];
			this.e[key].onchange = this.option_set.bind(this, key);
		}

		/* Check for optional libraries. */
		const extensions = [ this.spaLink, this.spaImage ];
		if (typeof mermaid !== 'undefined') {
			extensions.push(this.codeMermaid);
			this.is_mermaid = true;
		}
		if (typeof hljs !== 'undefined') {
			this.is_hljs = true;
		}

		/* Initialize marked and fetch index. */
		marked.use({ extensions: extensions });
		this.home();
	},

	/* Custom extension to replace internal links 'href' with 'onclick' handlers. */
	spaLink: {
		name: 'link',
		renderer(token) {
			let a = '<a ';
			if (!/^\w*:\/\/.*/.test(token.href) && /.*\.md$/.test(token.href)) {
				a += 'onclick=StW.fetch("' + StW.path + token.href + '")';
			}
			else {
				a += 'target=_blank href="' + token.href + '"';
			}
			if (token.title) {
				a += 'title="' + token.title + '"';
			}
			a += '>' + token.text + '</a>\n';
			return a;
		}
	},

	/* Custom extension to add full path to images 'href' to be 'src'. */
	spaImage: {
		name: 'image',
		renderer(token) {
			token.href = StW.path + token.href;
			return false;
		}
	},

	/* Custom extension to use mermaid library. */
	codeMermaid: {
		name: "code",
		renderer(token) {
			if(token.lang == "mermaid") {
				return '<pre class="mermaid">'
					+ token.text
					+ '</pre>\n';
			}
			return false;
		}
	},

	/* Handler to retrieve content. */
	fetch(page) {
		/* Keep back button history. */
		if (this.page) {
			this.history.push(this.page);
			this.e.back.disabled = false;
		}
		this.page = page;
		/* Update working path. */
		const depth = this.page.split('/')
		if (depth.length > 1) {
			this.path = depth.slice(0, -1).join('/') + '/';
		}
		else {
			this.path = '';
		}

		/* Fetch content. */
		this.info("fetching", 500);
		fetch(this.page)
			.then(response => {
				if(response.ok) {
					this.info("getting", 500);
					return response.text();
				}
				else {
					this.info("error", 3000);
					return "# Page not found!";
				}
			})
			.then(text => {
				this.info("parsing", 500);
				this.e.content.innerHTML = marked.parse(text);
				if (this.is_mermaid) {
					mermaid.init(this.e.content);
				}
				if (this.is_hljs) {
					hljs.highlightAll();
				}
			})
			.catch(error => alert(error));
	},

	/* Detect when leaving fullscreen. */
	windowed() {
		if (document.fullscreenElement) {
			this.e.fullscreen.classList.add("pushed");
			this.info("fullscreen");
		}
		else {
			this.e.fullscreen.classList.remove("pushed");
			this.info("windowed");
		}
	},

	/* Set select option. */
	option_set(key, e) {
		let val = e.target.value;
		this.cache_set(key, val);
		const ori = document.body.scrollHeight;
		document.documentElement.style.setProperty('--' + key, val);
		this.info(key + ": " + val);
		if (document.body.scrollHeight != ori) {
			window.scroll(0, (window.scrollY * document.body.scrollHeight) / ori);
		}
	},

	/* Kind of popup. */
	info(data, timeout=2000) {
		this.e.info.innerHTML = data;
		this.e.info.classList.remove("hide");
		setTimeout(this.info_hide.bind(this), timeout);
	},
	info_hide() {
		this.e.info.classList.add("hide");
	},

	/* Toggle between reader and settings. */
	menu() {
		this.e.menu.classList.toggle('pushed');
		for (const key of this.buttons.slice(1).concat(Object.keys(this.options))) {
			this.e[key].classList.toggle("hide");
		}
	},

	/* Go to index. */
	home() {
		this.fetch(this.index);
	},

	/* Switch fullscreen. */
	fullscreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		}
		else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	},

	/* Back button. */
	back() {
		const last = this.history.pop();
		if (this.history.length < 1) {
			this.e.back.disabled = true;
		}
		this.page = null;
		this.fetch(last);
	},

	/* Set and get options values from local storage. */
    cache_set(key, value) {
        localStorage.setItem(
            "StW_" + key,
            value
        );
    },
    cache_get(key) {
        return localStorage.getItem(
            "StW_" + key
        );
    }
};