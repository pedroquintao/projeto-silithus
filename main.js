const list = document.querySelector('#list-items');
const form = document.querySelector('#form');

items = [];

desenhaLista(); 

function desenhaLista(){
    items.forEach(elt => createItem(elt))
}

form.addEventListener('submit', (evt) => {
    
    evt.preventDefault();
    
    const itemName = evt.target.elements['form-name'];
    const itemSlot = evt.target.elements['form-slot'];
    const itemRarity = evt.target.elements['form-rarity'];

    const currentItem = {
        Name: itemName,
        Slot: itemSlot,
        Rarity: itemRarity
    };

    createItem(currentItem);

    items.push(currentItem);
});

function createItem(item) {
    const newList = document.createElement('li')
    newList.classList.add('list__items__item')

    const newNameValue = document.createElement('strong')
    newNameValue.innerHTML = item.Name.value;

    newList.appendChild(newNameValue);

    newList.dataset.name = item.Name.value;
    newList.dataset.slot = item.Slot.value;
    newList.dataset.rarity = item.Rarity.value;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('item__delete__button');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', function() {
        deleteItem(this);
    })
    newList.appendChild(deleteButton);

    
    list.appendChild(newList);
    console.log(list);
}

function deleteItem(item){
    item.parentNode.remove();
    console.log(item.parentNode)
}