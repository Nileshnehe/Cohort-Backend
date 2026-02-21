import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register(username, email, password) {
    try {
        const respones = await api.post("/register", {
            username,
            email,
            password
        })

        return respones.data

    } catch (err) {
        throw err
    }
}

export async function signin(username, password) {
    try {
        const respones = await api.post("/login", {
            username,
            password,
        })

        return respones.data

    } catch (err) {
        throw err
    }
}

export async function getMe() {
    try {
        const respones = await api.get("/get-Me")
        return respones.data
    } catch (err) {
        throw err
    }
}