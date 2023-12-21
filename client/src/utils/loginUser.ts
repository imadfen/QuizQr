import { serverUrl } from "./serverUrl";

export default async function loginUser(username: string, password: string) {
    const response = await fetch(`${serverUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
        if (response.status === 401) {
            return { error: "invalid username or password" }
        }

        return { error: "something went wrong" }
    }

    const token = (await response.json()).token;
    localStorage.setItem("token", token);
    return true
}