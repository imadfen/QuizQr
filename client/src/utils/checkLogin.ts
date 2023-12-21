import { serverUrl } from "./serverUrl"

export default function checkLogin(): Promise<boolean> {
    return new Promise((resolve) => {
        const token = localStorage.getItem('token');

        if (!token) {
            resolve(false);
            return;
        }

        fetch(`${serverUrl}/auth/check-login`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    resolve(false);
                    return;
                }
                return response.json();
            })
            .then((data) => {
                resolve(true);
            })
            .catch(() => {
                resolve(false);
            });
    });
};