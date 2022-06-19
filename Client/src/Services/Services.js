const fetchData = async (url, toSearch) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                item: toSearch,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            throw new Error(`Something went wrong, Error ${response.status}`)
        }
        
        const data = await response.json()

        return data;

    } catch (error) {
        return error.message 
    }
}

export const searchItem = async (itemToSearch) =>{
    return fetchData('http://localhost:4747/api/items', itemToSearch)
}

export const detailItem = async (itemId) =>{
    return fetchData('http://localhost:4747/id', itemId)
}


