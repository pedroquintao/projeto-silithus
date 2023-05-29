// const list = document.querySelector('#list-items'); // Seleciona o elemento com id "list-items" e o armazena na constante list
// const form = document.querySelector('#form'); //Seleciona o elemento com o id "form" e o armazena na constante form
// const url = 'http://localhost:8080/items';
// // const items = getItemsMethod(url);

// getItemsMethod(url);

// addSubimitListener(form);

// addTestButtonListener();

// // deleteMethod(url, 5)
// function drawList(data){
//     data.forEach(elt => {createItem(elt)});
// }

// function createItem(item) {

//     const newItem = document.createElement('div');

//     addInnerHtml(newItem, item);

//     addDeleteButtonListener(newItem, item);

//     addUpdateButtonListener(newItem, item);

//     addDropDownListener(newItem);

//     drawItem(newItem);
    
// }

// function addSubimitListener(forms) {

//     forms.addEventListener('submit', (evt) => {
        
//         evt.preventDefault();
        
//         const inputFormsData = evt.target.elements;

//         const inputItem = createInputItem(inputFormsData);
        
//         // createItem(inputItem);
//         console.log('%cmain.js line:44 inputItem', 'color: #007acc;', inputItem);

//         inputItem.id === undefined? postItemMethod(inputItem, url) : putMethod(inputItem, url); //fazer o put

//         clearForms();
//     });
// }

// function createInputItem(inputFormsData) {

//     const body = {
//         id: undefined,
//         name: inputFormsData['form-name'].value,
//         slot: inputFormsData['form-slot'].value.toUpperCase(),
//         rarity: inputFormsData['form-rarity'].value.toUpperCase()            
//         };

//     return body;
// };

// function checkLastItemId() {
//     return items[items.length -1]? items[items.length -1].Id + 1 : 0;
// }

// function clearForms() {
//     const formsToClear = document.querySelectorAll('.form__selection')

//     formsToClear.forEach(element => {
//         element.value = "";  
//     });
// }

// function addInnerHtml(element, item) {

//     element.innerHTML = `<li class="list__items__item" data-id="${item.Id}" data-name="${item.name}" data-slot="${item.slot}" data-rarity="${item.rarity}">
//                             <div class="list__items__item__box">
//                                 <div class="list__items__item__box__itemname">
//                                     <strong class="list__items__item__box__itemname__name">${normalizeWord(item.name)}</strong>
//                                 </div>
//                                 <div class="crud_buttons">
//                                 <button class="item__update__button">U</button>
//                                 <button class="item__delete__button">X</button>   
//                                 </div>              
//                             </div>
//                             <ul class="dropdown">
//                                 <li class="dropdown__item">
//                                     <p>${normalizeWord(item.name)}</p>        
//                                 </ 
//                                 <li class="dropdown__item">
//                                         <p>${normalizeWord(item.slot)}</p>
//                                 </ 
//                                 <li class="dropdown__item">
//                                     <p>${normalizeWord(item.rarity)}</p>
//                                 </li>
//                             </ul>
//                         </li>`;
// }

// function normalizeWord(word) {

//     const splitedWord = word.toLowerCase().split('');
//     splitedWord[0] = splitedWord[0].toUpperCase();
//     return splitedWord.join('')
    
// }

// function addDropDownListener(element) {

//     const itemClickableArea = element.querySelector('.list__items__item__box__itemname')

//     itemClickableArea.addEventListener('click', function() {

//         const dropDown = element.querySelector('.dropdown')
//         dropDown.classList.toggle('dropdown-show');
//     })
// }

// function drawItem(item) {

//     list.appendChild(item);
// }

// function addDeleteButtonListener(element, item) {

//     const deleteButton = element.querySelector('.item__delete__button');

//     deleteButton.addEventListener('click', function() {
//         element.remove();
//         deleteMethod(url, item.id);
//     })
// }

// function addUpdateButtonListener(element, item) {
//     const updateButton = element.querySelector('.item__update__button')

//     updateButton.addEventListener('click', () => {
//         fillForms(item);
//     })
// }

// function fillForms(item) {

//     const json2Array = Object.values(item)

//     const formData = document.querySelectorAll('.form__selection');

//     formData.forEach((elt, i) => {
//         elt.value = json2Array[i+1];
//         console.log('%cmain.js line:152 elt', 'color: #007acc;', elt);
//         console.log('%cmain.js line:152 json2Array[i+1]', 'color: #007acc;', json2Array[i+1]);
//     })

//     console.log('%cmain.js line:155 items', 'color: #007acc;', item);
//     console.log('%cmain.js line:154 json2Array', 'color: #007acc;', json2Array);
//     console.log('%cmain.js line:155 formData', 'color: #007acc;', formData);
// }

// function addTestButtonListener() {
    
//     document.querySelector('.test').addEventListener('click', () => {
//         const o = {
//             id: undefined,
//             name: 'nome',
//             slot: 'Head',
//             rarity: 'Rare'          
//             };
        
//         console.log('%cmain.js line:146 f depois:', 'color: #007acc;', f);
//         }
//     );
// }


// function getItemsMethod(url) {

//     fetch(url)
//     .then(res => res.json())
//     .then(data => {drawList(data.content)});
// }

// function postItemMethod(item, url) {

//     let headers = new Headers();
//     headers.set("Content-Type", "Application/json");

//     fetch(url, {method: "POST", body: JSON.stringify(item), headers:headers})
//     .then(response => response.json())
//     .then(data => {
//         createItem(data);
//         console.log("O item " + item.name + " criado com sucesso!")
//     });
// }

// function putMethod(item, url) {

    
// }

// function deleteMethod(url, id) {
//     fetch(url + `/${id}`, {method: "DELETE"}).then(() => console.log("O item com o ID: " + id + " Foi deletado"))
// }

// // =================================================================================================================
// //                                                     Next Step
// // =================================================================================================================

// // - Implementar a função de editar o item -> Para isso, será necessário definir como será a forma de alterar os dados do item, se é via formulário etc.

// // - Dar um jeito de tirar o slot e rarity de caixa alta no dropdown

// // - Falar com Daniel: Quando deleta um item, o id dele é apagado, e quando vai criar outro item, o próximo id continua na sequencia do ultimo criado. Ex: id dos itens cadastrados: 1, 2, 3 se o item de id 3 é apagado, e um novo item é criado em sequencia, esse novo item terá o id 4 e não 3. Isso está correto? 




