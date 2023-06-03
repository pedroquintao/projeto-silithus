async function getItems(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function getItem(url, id) {
    const response = await fetch(url + `${id}`);
    const data = response.json();

    return data;
}

async function postItem(url, item) {
    
    
    const response = await fetch(url, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(item)
    })

    if(!response.ok) {
        throw new Error("Não foi possível cadastrar o item");
    }

    const data = response.json();

    return data;
}

async function putItem(url, item) {    
    const response = await fetch(url, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(item)
    });
    const data = await response.json();

    return data;
}

async function deleteItem(url, id) {
    const repsonse = await fetch(url + `/${id}`, {
        method: "DELETE"
    });
}

export const apiRequests = {
    getItems,
    getItem,
    postItem,
    putItem,
    deleteItem
}