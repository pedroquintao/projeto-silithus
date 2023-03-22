const list = document.querySelectorAll('.list__item__test');
const form = document.querySelector('#form');

itens = [];

desenhaLista(); 

function desenhaLista(){
    list.forEach(elt => createItem(elt))
}

function createItem(item){
    console.log(item)
}

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();
    
    const itemName = evt.target.elements['form-name'];
    console.log(itemName.value)
})