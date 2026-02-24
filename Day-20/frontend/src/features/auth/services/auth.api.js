import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost/:3000/api/auth",
    withCredential: true,
})

export async function login(username, password) {
    const respones = await api.post("/login", {
        username,
        password
    })

    return respones.data
}

export async function regisetr(username, email, password) {
    const respones = await api.post("/register", {
        username,
        email,
        password
    })

    return respones.data
}

export async function getMe() {
    const respones = await api.get("/get-me")

    return respones.data
}