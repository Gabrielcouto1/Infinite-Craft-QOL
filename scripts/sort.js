const sortElements= () => {
    window.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements.sort((a, b) => (a.text > b.text) ? 1 : -1);
}

export function createSortButton(){
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
}