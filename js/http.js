export const BASE_URL = 'https://myfakeapi.com/api'


export const getData = async (path) => {
    try {
        const res = await fetch(BASE_URL + path)
        const data = await res.json()
        return data
    } catch (error) {
        return []
    }
}