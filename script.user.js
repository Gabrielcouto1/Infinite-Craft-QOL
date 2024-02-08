// ==UserScript==
// @name         Infinite-craft quality of life
// @namespace    http://tampermonkey.net/
// @version      2024-02-07
// @description  try to take over the world!
// @author       You
// @match        https://neal.fun/infinite-craft/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ADDING ALPHABETICALLY SORTING BUTTON
function aa(){
    const sortElements= () => {
      window.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements.sort((a, b) => (a.text > b.text) ? 1 : -1);
    }

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

  function addButton() {
      var button = document.createElement("button");
      Object.keys(buttonStyle).forEach((attr) => {
          button.style[attr] = buttonStyle[attr];
      });

      button.innerText = "Sort elements"
      button.addEventListener('click', () => sortElements());

      document.body.appendChild(button);
    }
  addButton();

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // CREATES FUNCTION TO GET NOT WORKING ORIGINAL SEARCH INPUT
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

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // CREATES WORKING SEARCH BAR AND REPLACES WITH THE OLD ONE
  let items = () => [...document.querySelectorAll('.item:not(.instance)')]
  let show = (elt) => elt.style.display=''
  let hide = (elt) => elt.style.display='none'
  let search = (text) => (items().forEach(show), items().filter(e => !e.innerText.toLowerCase().includes(text.toLowerCase())).forEach(hide))
  let inputElt = document.createElement('input'); inputElt.type='text';

  function handle(e) { search(e.target.value) }

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

    // Your existing code to get JSON
    var gameData = {
        discoveries: window.$nuxt.$root.$children[2].$children[0].$children[0]._data.discoveries,
        elements: window.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements
    };

    // Convert the JSON to a string
    var jsonString = JSON.stringify(gameData);

    // Create a button element
    var copyButton = document.createElement('button');
    copyButton.innerHTML = 'Export save (JSON) <img src="https://cdn-icons-png.flaticon.com/512/1827/1827938.png" style="width:27px; margin-left:11px; margin-right:0px; flex-direction: row;">';
    copyButton.style.position = 'fixed';
    copyButton.className = 'btn';
    copyButton.style.top = '10px';
    copyButton.style.left = '10px';

    // Append the button to the document
    document.body.appendChild(copyButton);

    // Add click event listener to the button
    copyButton.addEventListener('click', function() {
        // Create a textarea element to hold the JSON
        var textarea = document.createElement('textarea');
        textarea.value = jsonString;

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Remove the temporary textarea from the document
        document.body.removeChild(textarea);

        // Notify the user
        alert('JSON copied to clipboard!');
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
    //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Adrianmgg's code to add recipe list and discoveries list

}

setTimeout(aa, 1000);