const form = document.querySelector('#form-area');

var id = 0;



form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const input = {
        name: evt.target.elements['form-name'].value,
        slot: evt.target.elements['form-slot'].value,
        rarity: evt.target.elements['form-rarity'].value
    };

    submitInput(input);

})

function submitInput(i) {
    console.log('%cmain-paralelo.js line:18 \nESSA É UMA MENSAGEM DE SIMULAÇÃO PARA ENVIO DE REQUISIÇÃO!\n', 'color: #ffff00;',"Aqui deve entrar um método que envia a requisição para o backend armazenar os dados do input e retornar o id do item. Requisição enviada contendo a msg:\n");
    console.log(i);  
    console.log('%cmain-paralelo.js line:21 \nESSA É UMA MENSAGEM DE SIMULAÇÃO DE RESPOSTA DA REQUISIÇÃO!\n ', 'color: #77ff00;', '\n O id retornado é: id = ' + id);
    id++;
}

// =================================================================================================================
//                                                     Next Step
// =================================================================================================================

//-Criar a parte do dropdown no .css. Talvez terá que aprender table

//-Area formulario        
//-3 campos + botao
//  - nome
    // -slot
    // -raridade
    // -submit -> envia um requisição para criar um item
        // receber uma resposta que é um status e uma msg

//Area itens
    //-criar fun. que desenha lista, envia a requisição e retorna os itens
    //-desenhar itens na tela
        //-em cada item, clocar botao X (delete) -> quando deletar, irá enviar o id do item.
        //-''  ''   '',    ''     ''  Lapis (editar) -> click: preencher dados do formulario com aquele item, alterar o que eu quiser alterar e enviar. Estara o id

        
        


