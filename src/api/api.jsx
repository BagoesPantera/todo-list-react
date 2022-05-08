import { $fetch } from 'ohmyfetch';
const apiFetch = $fetch.create({
    baseURL: "https://arcane-cove-45501.herokuapp.com/api"
})

export default apiFetch;