const BASE_URL = 'https://fakestoreapi.com/';

export async function fetchData(url) {
    try {
        const response = await fetch(`${BASE_URL}${url}`);
        return response.json();

    }catch(error){
        console.error(error);
    }
}