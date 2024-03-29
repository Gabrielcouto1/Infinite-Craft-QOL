// ==UserScript==
// @name         Infinite-craft quality of life
// @namespace    http://tampermonkey.net/
// @version      2024-02-07
// @description  try to take over the world!
// @author       Couto
// @match        https://neal.fun/infinite-craft/
// @icon         https://neal.fun/favicons/infinite-craft.png
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ADDING ALPHABETICALLY SORTING BUTTON
function init() {
	function customShuffle(array) {
		let shuffledArray = [];
		console.log(array);
		while (array.length > 0) {
			const randomIndex = Math.floor(Math.random() * array.length);
			const removedElement = array.splice(randomIndex, 1)[0];
			shuffledArray.push(removedElement);
		}

		console.log(shuffledArray);
		array = shuffledArray;
	}

	const sortElements = (order) => {

		let elements = unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements;

		if (order === 'alphabetical') {
			elements.sort((a, b) => (a.text > b.text) ? 1 : -1);
		} else if (order === 'random') {
			customShuffle(elements);
			console.log(elements);
			console.log(unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements);
		}
	};

	const buttonStyle = {
		appearance: 'none',
		position: 'absolute',
		width: '100px',
		height: '55px',
		backgroundColor: '#1A1B31',
		color: 'white',
		fontWeight: 'bold',
		fontFamily: 'Roboto,sans-serif',
		border: '0',
		outline: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		padding: 4,
		left: '24px',
		bottom: '24px',
	};

	function addButton(text, clickHandler) {
		var button = document.createElement("button");
		Object.keys(buttonStyle).forEach((attr) => {
			button.style[attr] = buttonStyle[attr];
		});
		if (text == "Sort randomly") {
			button.style.marginLeft = '130px';
		}
		button.innerText = text;
		button.addEventListener('click', clickHandler);

		document.body.appendChild(button);
	}

	function addButtons() {
		addButton("Sort alphabetically", () => sortElements('alphabetical'));
		addButton("Sort randomly", () => sortElements('random'));
	}

	addButtons();


	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// CREATES FUNCTION TO GET NOT WORKING ORIGINAL SEARCH INPUT
	function getElementByPlaceholder(placeholder) {
		const inputElements = document.querySelectorAll('input');

		for (const input of inputElements) {
			if (input.placeholder === placeholder) {
				return input;
			}
		}

		return null;
	}

	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	// CREATES WORKING SEARCH BAR AND REPLACES WITH THE OLD ONE
	let items = () => [...document.querySelectorAll('.item:not(.instance)')]
	let show = (elt) => elt.style.display = ''
	let hide = (elt) => elt.style.display = 'none'
	let search = (text) => (items().forEach(show), items().filter(e => !e.innerText.toLowerCase().includes(text.toLowerCase())).forEach(hide))
	let inputElt = document.createElement('input');
	inputElt.type = 'text';

	function handle(e) {
		search(e.target.value)
	}

	inputElt.style.webkitTextSizeAdjust = '100%';
	inputElt.style.webkitFontSmoothing = 'antialiased';
	inputElt.style.userSelect = 'none';
	inputElt.style.boxSizing = 'border-box';
	inputElt.style.margin = '0';
	inputElt.style.width = '100%';
	inputElt.style.fontSize = '16px';
	inputElt.style.border = 'none';
	inputElt.style.borderTop = '1px solid #c8c8c8';
	inputElt.style.outline = '0';
	inputElt.style.padding = '0 20px 0 40px';
	inputElt.style.height = '40px';
	inputElt.style.lineHeight = '18px';
	inputElt.style.position = 'relative';
	inputElt.style.background = 'url(/infinite-craft/search.svg) no-repeat 22px 22px';
	inputElt.style.backgroundSize = '21px 21px';
	inputElt.style.backgroundPosition = '10px 10px';

	inputElt.placeholder = "Search items.....";

	inputElt.addEventListener('input', handle);

	getElementByPlaceholder("Search items...").replaceWith(inputElt);

	// Create a button element
	var copyButton = document.createElement('button');
	copyButton.innerHTML = 'Export save (JSON) <img src="https://cdn-icons-png.flaticon.com/512/1827/1827938.png" style="width:27px; margin-left:11px; margin-right:0px; flex-direction: row;">';
	copyButton.style.position = 'fixed';
	copyButton.className = 'btn';
	copyButton.style.top = '10px';
	copyButton.style.left = '10px';

	document.body.appendChild(copyButton);

	copyButton.addEventListener('click', function() {
		var gameData = {
			discoveries: unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.discoveries,
			elements: unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements
		};

		var jsonString = JSON.stringify(gameData);

		var textarea = document.createElement('textarea');
		textarea.value = jsonString;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);

		var blob = new Blob([jsonString], {
			type: 'application/json'
		});

		var downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = 'Infinite-craft-save.json';

		document.body.appendChild(downloadLink);

		downloadLink.click();

		document.body.removeChild(downloadLink);

		alert('JSON copied to clipboard and downloaded (infinite-craft-save.json)!');
	});
	var styleElement = document.createElement('style');
	styleElement.innerHTML = `
  .btn {
    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 12px;
    color: #000000;
    background: linear-gradient(90deg, #213cd9 0%, #ffffff 100%);
    padding: 5px 20px;
    border: solid #000000 2px;
    box-shadow: rgb(0, 0, 0) 17px -9px 21px 4px;
    border-radius: 37px;
    transition: 645ms;
    transform: translateY(0);
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-left: 250px;
  }

  .btn:hover {
    transition: 645ms;
    padding: 7px 22px;
    transform: translateY(-5px);
    background: linear-gradient(90deg, #213cd9 0%, #ffffff 100%);
    color: #2b2e30;
    border: solid 2px #0066cc;
  }
  `;

	document.head.appendChild(styleElement);
	//---------------------------------------------------------------------------------------------------------
	// CREATE BUTTON TO IMPORT SAVE FILE
	const fileInput = document.createElement('input');
	fileInput.type = 'file';
	fileInput.accept = '.json'; // Allow only JSON files

	// Add an event listener to handle file selection
	fileInput.addEventListener('change', handleFileSelect);

	// Apply styles to the file input
	fileInput.style.display = 'none'; // Hide the default file input
	fileInput.style.opacity = '0'; // Make the file input transparent

	// Create a styled button element
	const importButton = document.createElement('button');
	importButton.style.fontFamily = 'Roboto, sans-serif';
	importButton.style.fontWeight = '600';
	importButton.style.fontSize = '12px';
	importButton.style.color = '#000000';
	importButton.style.background = 'linear-gradient(90deg, #ffffff 0%, #213cd9 100%)';
	importButton.style.padding = '5px 20px';
	importButton.style.border = '2px solid #000000';
	importButton.style.boxShadow = 'rgb(0, 0, 0) 28px -9px 25px 5px';
	importButton.style.borderRadius = '50px';
	importButton.style.transition = '857ms';
	importButton.style.transform = 'translateY(0)';
	importButton.style.display = 'flex';
	importButton.style.flexDirection = 'row';
	importButton.style.alignItems = 'center';
	importButton.style.marginLeft = '550px'
	importButton.style.marginTop = '10px';
	importButton.style.cursor = 'pointer';

	importButton.addEventListener('mouseenter', function() {
		importButton.style.transition = '857ms';
		importButton.style.padding = '7px 22px';
		importButton.style.transform = 'translateY(-0px)';
		importButton.style.color = '#2b2e30';
		importButton.style.border = 'solid 2px #0066cc';
	});

	importButton.addEventListener('mouseleave', function() {
		importButton.style.transition = '857ms';
		importButton.style.padding = '5px 20px';
		importButton.style.transform = 'translateY(0)';
		importButton.style.color = '#000000';
		importButton.style.border = '2px solid #000000';
	});

	importButton.innerHTML = 'Import save (JSON) <img src="https://cdn-icons-png.flaticon.com/512/136/136443.png" style="width:25px; margin-left:3px; margin-right:3px; flex-direction: row;">';

	// Add an event listener to trigger the file input when the button is clicked
	importButton.addEventListener('click', function() {
		fileInput.click();
	});

	// Append the styled button to the document body or any other desired element
	document.getElementsByClassName("instances")[0].appendChild(importButton);

	// Function to handle file selection
	function handleFileSelect(event) {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();

			// Define a callback function to handle the file reading
			reader.onload = function(e) {
				try {
					// Parse the JSON data from the file
					const jsonData = JSON.parse(e.target.result);

					// Update the elements and discoveries data
					unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements = jsonData.elements || [];
					unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.discoveries = jsonData.discoveries || [];

					// Display an alert with the number of elements discovered
					alert(`${jsonData.elements.length || 0} elements discovered!`);
				} catch (error) {
					// Handle parsing error
					console.error('Error parsing JSON file:', error);
					alert('Error parsing JSON file. Please make sure the file is valid.');
				}
			};

			// Read the file as text
			reader.readAsText(file);
		}
	}

	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Adrianmgg's code to add recipe list and discoveries list (see full at https://github.com/adrianmgg/userscripts/tree/main/neal.fun/infinite_craft_combo_tracker)
	const elhelper = (function() {
		/* via https://github.com/adrianmgg/elhelper */
		function setup(elem, {
			style: {
				vars: styleVars = {},
				...style
			} = {},
			attrs = {},
			dataset = {},
			events = {},
			classList = [],
			children = [],
			parent = null,
			insertBefore = null,
			...props
		}) {
			for (const k in style) elem.style[k] = style[k];
			for (const k in styleVars) elem.style.setProperty(k, styleVars[k]);
			for (const k in attrs) elem.setAttribute(k, attrs[k]);
			for (const k in dataset) elem.dataset[k] = dataset[k];
			for (const k in events) elem.addEventListener(k, events[k]);
			for (const c of classList) elem.classList.add(c);
			for (const k in props) elem[k] = props[k];
			for (const c of children) elem.appendChild(c);
			if (parent !== null) {
				if (insertBefore !== null) parent.insertBefore(elem, insertBefore);
				else parent.appendChild(elem);
			}
			return elem;
		}

		function create(tagName, options = {}) {
			return setup(document.createElement(tagName), options);
		}

		function createNS(namespace, tagName, options = {}) {
			return setup(document.createElementNS(namespace, tagName), options);
		}
		return {
			setup,
			create,
			createNS
		};
	})();

	class GMValue {
		constructor(key, defaultValue) {
			this._key = key;
			this._defaultValue = defaultValue;
		}
		set(value) {
			GM_setValue(this._key, value);
		}
		get() {
			return GM_getValue(this._key, this._defaultValue);
		}
	}

	const VAL_COMBOS = new GMValue('infinitecraft_observed_combos', {});
	const VAL_PINNED_ELEMENTS = new GMValue('infinitecraft_pinned_elements', []);
	const VAL_DATA_VERSION = new GMValue('infinitecraft_data_version', 0);
	// TODO rename this?
	const GM_DATAVERSION_LATEST = 1;
	// TODO this should probably use the async versions of getvalue/setvalue since we're already only calling it from async code
	function saveCombo(lhs, rhs, result) {
		console.log(`crafted ${lhs} + ${rhs} -> ${result}`);
		const data = getCombos();
		if (!(result in data)) data[result] = [];
		const sortedLhsRhs = sortRecipeIngredients([lhs, rhs]);
		for (const existingPair of data[result]) {
			if (sortedLhsRhs[0] === existingPair[0] && sortedLhsRhs[1] === existingPair[1]) return;
		}
		const pair = [lhs, rhs];
		pair.sort();
		data[result].push(pair);
		VAL_COMBOS.set(data);
		VAL_DATA_VERSION.set(GM_DATAVERSION_LATEST);
	}
	// !! this sorts in-place !!
	function sortRecipeIngredients(components) {
		// internally the site uses localeCompare() but that being locale-specific could cause some problems in our use case
		//  it shouldn't matter though, since as long as we give these *some* consistent order it'll avoid duplicates,
		//  that order doesn't need to be the same as the one the site uses
		return components.sort();
	}

	function getCombos() {
		const data = VAL_COMBOS.get();
		const dataVersion = VAL_DATA_VERSION.get();
		if (dataVersion > GM_DATAVERSION_LATEST) {
			// uh oh
			// not gonna even try to handle this case, just toss up an error alert
			const msg = `infinite craft tweaks userscript's internal save data was marked as version ${dataVersion}, but the highest expected version was ${GM_DATAVERSION_LATEST}.
    if you've downgraded the userscript or copied save data from someone else, update the userscript and try again. otherwise, please file a bug report at https://github.amgg.gg/userscripts/issues`;
			alert(msg);
			throw new Error(msg);
		}
		if (dataVersion < GM_DATAVERSION_LATEST) {
			// confirm that user wants to update save data
			const updateConfirm = confirm(`infinite craft tweaks userscript's internal save data is from an earlier version, and needs to be upgraded. (if you select cancel, userscript will be non-functional, so this choice is mostly for if you want to take a moment to manually back up the data just in case.)

    proceed with upgrading save data?`);
			if (!updateConfirm) {
				throw new Error('user chose not to update save data');
			}
			// upgrade the data
			if (dataVersion <= 0) {
				// recipes in this version weren't sorted, and may contain duplicates once sorting has been applied
				for (const result in data) {
					// sort the recipes (just do it in place, since we're not gonna use the old data again
					for (const recipe of data[result]) {
						sortRecipeIngredients(recipe);
					}
					// build new list with just the ones that remain not duplicate
					const newRecipesList = [];
					for (const recipe of data[result]) {
						if (!(newRecipesList.some(r => recipe[0] === r[0] && recipe[1] === r[1]))) {
							newRecipesList.push(recipe);
						}
					}
					data[result] = newRecipesList;
				}
			}
			// now that it's upgraded, save the upgraded data & update the version
			VAL_COMBOS.set(data);
			VAL_DATA_VERSION.set(GM_DATAVERSION_LATEST);
			// (fall through to retun below)
		}
		// the data is definitely current now
		return data;
	}

	function main() {
		const _getCraftResponse = icMain.getCraftResponse;
		const _selectElement = icMain.selectElement;
		const _selectInstance = icMain.selectInstance;
		icMain.getCraftResponse = async function(lhs, rhs) {
			const resp = await _getCraftResponse.apply(this, arguments);
			saveCombo(lhs.text, rhs.text, resp.result);
			return resp;
		};

		// random element thing
		document.documentElement.addEventListener('mousedown', e => {
			if (e.buttons === 1 && e.altKey && !e.shiftKey) { // left mouse + alt
				e.preventDefault();
				e.stopPropagation();
				const elements = icMain._data.elements;
				const randomElement = elements[Math.floor(Math.random() * elements.length)];
				_selectElement(e, randomElement);
			} else if (e.buttons === 1 && !e.altKey && e.shiftKey) { // lmb + shift
				e.preventDefault();
				e.stopPropagation();
				const instances = icMain._data.instances;
				const lastInstance = instances[instances.length - 1];
				const lastInstanceElement = icMain._data.elements.filter(e => e.text === lastInstance.text)[0];
				_selectElement(e, lastInstanceElement);
			}
		}, {
			capture: false
		});

		// special search handlers
		const searchHandlers = {
			'regex:': (txt) => {
				const pattern = new RegExp(txt);
				return (element) => pattern.test(element.text);
			},
			'regexi:': (txt) => {
				const pattern = new RegExp(txt, 'i');
				return (element) => pattern.test(element.text);
			},
			'full:': (txt) => {
				return (element) => element.text === txt;
			},
			'fulli:': (txt) => {
				const lower = txt.toLowerCase();
				return (element) => element.text.toLowerCase() === lower;
			},
		};
		const _sortedElements__get = icMain?._computedWatchers?.sortedElements?.getter;
		// if that wasn't where we expected it to be, don't try to patch it
		if (_sortedElements__get !== null && _sortedElements__get !== undefined) {
			icMain._computedWatchers.sortedElements.getter = function() {
				for (const handlerPrefix in searchHandlers) {
					if (this.searchQuery && this.searchQuery.startsWith(handlerPrefix)) {
						try {
							const filter = searchHandlers[handlerPrefix](this.searchQuery.substr(handlerPrefix.length));
							return this.elements.filter(filter);
						} catch (err) {
							console.error(`error during search handler '${handlerPrefix}'`, err);
							return [];
						}
					}
				}
				return _sortedElements__get.apply(this, arguments);
			}
		}

		// get the dataset thing they use for scoping css stuff
		// TODO add some better handling for if there's zero/multiple dataset attrs on that element in future
		const cssScopeDatasetThing = Object.keys(icMain.$el.dataset)[0];

		function mkElementItem(element) {
			return elhelper.create('div', {
				classList: ['item'],
				dataset: {
					[cssScopeDatasetThing]: ''
				},
				children: [
					elhelper.create('span', {
						classList: ['item-emoji'],
						dataset: {
							[cssScopeDatasetThing]: ''
						},
						textContent: element.emoji,
						style: {
							pointerEvents: 'none',
						},
					}),
					document.createTextNode(` ${element.text} `),
				],
			});
		}

		/* this will call genFn and iterate all the way through it,
		but taking a break every chunkSize iterations to allow rendering and stuff to happen.
		returns a promise. */
		function nonBlockingChunked(chunkSize, genFn, timeout = 0) {
			return new Promise((resolve, reject) => {
				const gen = genFn();
				(function doChunk() {
					for (let i = 0; i < chunkSize; i++) {
						const next = gen.next();
						if (next.done) {
							resolve();
							return;
						}
					}
					setTimeout(doChunk, timeout);
				})();
			});
		}

		// recipes popup
		const recipesListContainer = elhelper.create('div', {});

		function clearRecipesDialog() {
			while (recipesListContainer.firstChild !== null) recipesListContainer.removeChild(recipesListContainer.firstChild);
		}
		const recipesDialog = elhelper.create('dialog', {
			parent: document.body,
			children: [
				// close button
				elhelper.create('button', {
					textContent: 'x',
					events: {
						click: (evt) => recipesDialog.close(),
					},
				}),
				// the main content
				recipesListContainer,
			],
			style: {
				// need to unset this one thing from the page css
				margin: 'auto',
			},
			events: {
				close: (e) => {
					clearRecipesDialog();
				},
			},
		});
		async function openRecipesDialog(childGenerator) {
			clearRecipesDialog();
			// create a child to add to for just this call,
			//  as a lazy fix for the bug we'd otherwise have where opening a menu, quickly closing it, then opening it again
			//  would lead to the old menu's task still adding stuff to the new menu.
			//  (this doesn't actually stop any unnecessary work, but it at least prevents the possible visual bugs)
			const container = elhelper.create('div', {
				parent: recipesListContainer
			});
			// show the dialog
			recipesDialog.showModal();
			// populate the dialog
			await nonBlockingChunked(512, function*() {
				for (const child of childGenerator()) {
					container.appendChild(child);
					yield;
				}
			});
		}

		// recipes button
		function addControlsButton(label, handler) {
			elhelper.create('div', {
				parent: document.querySelector('.side-controls'),
				textContent: label,
				style: {
					cursor: 'pointer',
				},
				events: {
					click: handler,
				},
			});
		}

		addControlsButton('recipes', () => {
			// build a name -> element map
			const byName = {};
			const byNameLower = {}; // for fallback stuff
			for (const element of icMain._data.elements) {
				byName[element.text] = element;
				byNameLower[element.text.toLowerCase()] = element;
			}

			function getByName(name) {
				// first, try grabbing it by its exact name
				const fromNormal = byName[name];
				if (fromNormal !== undefined) {
					return byName[name];
				}
				// if that doesn't do it, try that but ignoring case.
				//  i think it doesn't accept new elements if they're case-insensitive equal to an element the user already has? or something like that at least
				const fromLower = byNameLower[name.toLowerCase()];
				if (fromLower !== undefined) {
					return fromLower;
				}
				// worst case, we have neither
				return {
					emoji: "❌",
					text: `[userscript encountered an error trying to look up element '${name}']`
				};
			}
			const combos = getCombos();

			function listItemClick(evt) {
				const elementName = evt.target.dataset.comboviewerElement;
				document.querySelector(`[data-comboviewer-section="${CSS.escape(elementName)}"]`).scrollIntoView({
					block: 'nearest'
				});
			}

			function mkLinkedElementItem(element) {
				return elhelper.setup(mkElementItem(element), {
					events: {
						click: listItemClick
					},
					dataset: {
						comboviewerElement: element.text
					},
				});
			}
			openRecipesDialog(function*() {
				for (const comboResult in combos) {
					if (comboResult === 'Nothing') continue;
					// anchor for jumping to
					yield elhelper.create('div', {
						dataset: {
							comboviewerSection: comboResult
						},
					});
					for (const [lhs, rhs] of combos[comboResult]) {
						yield elhelper.create('div', {
							children: [
								mkLinkedElementItem(getByName(comboResult)),
								document.createTextNode(' = '),
								mkLinkedElementItem(getByName(lhs)),
								document.createTextNode(' + '),
								mkLinkedElementItem(getByName(rhs)),
							],
						});
					}
				}
			});
		});

		// first discoveries list (just gonna hijack the recipes popup for simplicity)
		addControlsButton('discoveries', () => {
			openRecipesDialog(function*() {
				for (const element of icMain._data.elements) {
					if (element.discovered) {
						yield mkElementItem(element);
					}
				}
			});
		});

		// pinned combos thing
		const sidebar = document.querySelector('.container > .sidebar');
		const pinnedCombos = elhelper.create('div', {
			parent: sidebar,
			insertBefore: sidebar.firstChild,
			style: {
				position: 'sticky',
				top: '0',
				background: 'white',
				width: '100%',
				maxHeight: '50%',
				overflowY: 'auto',
			},
		});
		// !! does NOT save it to pins list
		function addPinnedElementInternal(element) {
			// this isnt a good variable name but it's slightly funny and sometimes that's all that matters
			const elementElement = mkElementItem(element);
			const txt = element.text;
			elhelper.setup(elementElement, {
				parent: pinnedCombos,
				events: {
					mousedown: (e) => {
						if (e.buttons === 4 || (e.buttons === 1 && e.altKey && !e.shiftKey)) {
							pinnedCombos.removeChild(elementElement);
							const pins = VAL_PINNED_ELEMENTS.get();
							VAL_PINNED_ELEMENTS.set(pins.filter(p => p !== txt));
							return;
						}
						icMain.selectElement(e, element);
					},
				},
			});
		}
		// does save it to pins list also
		function addPinnedElement(element) {
			const pins = VAL_PINNED_ELEMENTS.get();
			if (!(pins.some(p => p === element.text))) { // no duplicates
				addPinnedElementInternal(element);
				pins.push(element.text);
				VAL_PINNED_ELEMENTS.set(pins);
			}
		}
		icMain.selectElement = function(mouseEvent, element) {
			if (mouseEvent.buttons === 4 || (mouseEvent.buttons === 1 && mouseEvent.altKey && !mouseEvent.shiftKey)) {
				// this won't actually stop it since what gets passed into this is a mousedown event
				mouseEvent.preventDefault();
				mouseEvent.stopPropagation();
				addPinnedElement(element);
				return;
			}
			return _selectElement.apply(this, arguments);
		};
		icMain.selectInstance = function(mouseEvent, instance) {
			// specifically don't do alt-lmb alias for instances, since it ends up being accidentally set off a bunch by the alt-drag random element feature
			if (mouseEvent.buttons === 4) {
				// this won't actually stop it since what gets passed into this is a mousedown event
				mouseEvent.preventDefault();
				mouseEvent.stopPropagation();
				addPinnedElement({
					text: instance.text,
					emoji: instance.emoji
				});
				return;
			}
			return _selectInstance.apply(this, arguments);
		};
		// load initial pinned elements
		(() => {
			const existingPins = VAL_PINNED_ELEMENTS.get();
			for (const pin of existingPins) {
				const pinElement = icMain._data.elements.find(e => e.text === pin);
				if (pinElement !== undefined) {
					addPinnedElementInternal(pinElement);
				}
			}
		})();
	}
	// stores the object where most of the infinite craft functions live.
	//  can be assumed to be set by the time main is called
	let icMain = null;
	// need to wait for stuff to be actually initialized.
	//  might be an actual thing we can hook into to detect that
	//  but for now just waiting until the function we want exists works well enough
	(function waitForReady() {
		icMain = unsafeWindow?.$nuxt?._route?.matched?.[0]?.instances?.default;
		if (icMain !== undefined && icMain !== null) main();
		else setTimeout(waitForReady, 10);
	})();
}

setTimeout(init, 500);