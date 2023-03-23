const list = document.querySelector('#list-items');
const form = document.querySelector('#form');

itens = [];

desenhaLista(); 

function desenhaLista(){
    itens.forEach(elt => createItem(elt))
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

    // console.log(currentItem)
    // console.log(itemName.value)
    // console.log(itemSlot.value)
    // console.log(itemRarity.value)
});

function createItem(item) {
    const newList = document.createElement('li')
    newList.classList.add('list__items__item')

    const newNameValue = document.createElement('strong')
    newNameValue.innerHTML = "nome";

    const newSlotValue = document.createElement('strong')
    newSlotValue.innerHTML = "slot";

    const newRarityValue = document.createElement('strong')
    newRarityValue.innerHTML = "rarity";

    newList.appendChild(newNameValue);
    newList.appendChild(newSlotValue);
    newList.appendChild(newRarityValue);

    list.appendChild(newList);

    console.log(newList.innerHTML);
    console.log(newList);

}