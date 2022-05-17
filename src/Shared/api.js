const URL = "http://localhost:8080";


export async function Logim(data) {

    return await fetch(URL + "/login/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => { return result })
}

export async function verifyToken(token) {

    return await fetch(URL + "/login/verify-token", {
        method: "GET",
        headers: {
            "x-access-token": token,
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => response.json()).then(result => { return result })
}

