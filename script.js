
const port = 'http://localhost:3000';

// Para pegar todos os itens
const getAllItems = async () => {
    try {
        const response = await fetch(`${port}/items`, {
            method: 'GET',
        });
        const content = await response.json();
        return content;

    } catch (error) {
        console.log(error);
    }
};


// Para pegar um item específico
const getItemById = async (id) => {
    try {
        
        const response = await fetch(`${port}/items/${id}`, {
            method: 'GET',
        });
        const content = await response.json();
        return content;
    } catch (error) {
        console.log(error);
    }
};

// Filtrar os itens pelo nome
const getItemByName = async (name) => {

    try {
        const content = await getAllItems().then(items => items.find(item => item.nome === name));
        return content;
    } catch (error) {
        console.log(error);
    }
};


const postItem = async (item, quantidade) => {
    try {
        const response = await fetch(`${port}/items`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: `${item}`,
                quantidade: `${quantidade}`
            })
        });

        const content = await response.json();

        return content;
    } catch (error) {
        console.log(error);
    }
};

const putItem = async (id, quantidade) => {
    try {
        const response = await fetch(`${port}/items/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quantidade: `${quantidade}`
            })
        });
        const content = await response.json();
        return content;
    } catch (error) {
        console.log(error);
    }
}

const deleteItem = async (id) => {
    try {
        const response = await fetch(`${port}/items/${id}`, {
            method: 'DELETE',
        });
        const content = await response.json();
        return content;
    } catch (error) {
        console.log(error);
    }
}



console.log(document);


document.querySelector('#enviar').addEventListener('click', async (event) => {

    event.preventDefault();

    const item = document.querySelector('#item').value;
    const quantidade = document.querySelector('#quantidade').value;

    if (item === '' || quantidade === '') {
        alert('Preencha todos os campos');
        return;
    }

    const response = await postItem(item, quantidade);

    console.log(response);

    document.querySelector('#item').value = '';
    document.querySelector('#quantidade').value = '';
    document.querySelector('#nome').focus();


    apresentarLista();


});


const apresentarLista = async () => {
    // Atualizar lista, pegando todos os itens

    const list = document.querySelector('#lista');
    const itens = await getAllItems();

    const novaLista = itens.map(item => {
        console.log(item.nome);
    
        const li = document.createElement('li');
        const texto = document.createTextNode(`${item.nome}: ${item.quantidade}`);
        
        li.appendChild(texto);
        return li;
    })

    list.replaceChildren(...novaLista);
};


(async () => apresentarLista())();



