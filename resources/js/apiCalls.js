BASE_URL = "http://127.0.0.1:8000/api/"

export async function getTags() {
    let result = await fetch(BASE_URL + "tag/");
    result = await result.json();
    return result;
}