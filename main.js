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

    console.log(items)
    // console.log(itemName.value)
    // console.log(itemSlot.value)
    // console.log(itemRarity.value)
});

function createItem(item) {
    const newList = document.createElement('li')
    newList.classList.add('list__items__item')

    const newNameValue = document.createElement('strong')
    newNameValue.innerHTML = item.Name.value;

    const newSlotValue = document.createElement('strong')
    newSlotValue.innerHTML = item.Slot.value;

    const newRarityValue = document.createElement('strong')
    newRarityValue.innerHTML = item.Rarity.value;

    newList.appendChild(newNameValue);
    newList.appendChild(newSlotValue);
    newList.appendChild(newRarityValue);

    list.appendChild(newList);

    console.log(newList.innerHTML);
}