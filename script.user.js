// ==UserScript==
// @name         Infinite craft QOL 
// @namespace    http://tampermonkey.net/
// @version      2024-02-07
// @description  Infinite craft Quality of life scripts 
// @author       You
// @match        http://neal.fun/infinite-craft
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
    
//----------------------------------------------------------------------------------------------------------------------------------------
//CREATE SORTING FUNCTION
const sortElements= () => {
    window.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements.sort((a, b) => (a.text > b.text) ? 1 : -1);
}

//----------------------------------------------------------------------------------------------------------------------------------------
// CREATE SORTING BUTTON FUNCTION
function createSortButton(){
    const buttonStyle = {
        appearance: 'none',
        position: 'absolute',
        width: '80px',
        height: '35px',
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
    }
    
    function addSortButtonDOM() {
        var button = document.createElement("button");
        Object.keys(buttonStyle).forEach((attr) => {
            button.style[attr] = buttonStyle[attr];
        });
        
        button.innerText = "Sort elements"
        button.addEventListener('click', () => sortElements());
        
        document.body.appendChild(button);
    }
    addSortButtonDOM();
}

//----------------------------------------------------------------------------------------------------------------------------------------
// REPLACE ORIGINAL NON WORKING SEARCH BAR
function getElementByPlaceholder(placeholder) {
    // Get all input elements in the document
    const inputElements = document.querySelectorAll('input');
    
    // Iterate through the input elements
    for (const input of inputElements) {
        // Check if the current input element has the specified placeholder
        if (input.placeholder === placeholder) {
            return input; // Return the element if found
        }
    }
    
    return null; // Return null if no element with the specified placeholder is found
}

function replaceSearchBar(){
    let items = () => [...document.querySelectorAll('.item')]
    let show = (elt) => elt.style.display=''
    let hide = (elt) => elt.style.display='none'
    let search = (text) => (items().forEach(show), items().filter(e => !e.innerText.toLowerCase().includes(text.toLowerCase())).forEach(hide))
    let inputElt = document.createElement('input'); inputElt.type='text';
    
    function handle(e) { search(e.target.value) }
    
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
}
    

//--------------------------------------------------------------------------------------------------------------------------------------------------
// Calling previously declared functions
createSortButton();
replaceSearchBar();
