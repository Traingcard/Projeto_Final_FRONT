const URL = "http://localhost:8080";


export async function Funcionarios(data) {

    return await fetch(URL + "/user", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => response.json()).then(result => { return result })
}

export async function Add_Funcionarios(data) {
    return await fetch(URL + "/user/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => { return result })
}

export async function Edit_Funcionarios(data) {

    return await fetch(URL + "/user/edit/"+ data.id, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(result => { return result })
}

export async function Delete_Funcionarios(data) {

    return await fetch(URL + "/user/delete/"+ data, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json()).then(result => { return result })
}




