const URL = "http://localhost:8080";


export async function getEvents() {

    return await fetch(URL + "/calendario", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => response.json()).then(result => { return result })
}

export async function getEventsbyId(data) {
    console.log(data);
    return await fetch(URL + "/calendario/"+ data, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => response.json()).then(result => { return result })
}

export async function findById(data) {
    console.log(data);
    return await fetch(URL + "/calendario/timer/"+ data, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => response.json()).then(result => { return result })
}

export async function postEvents(data) {

    return await fetch(URL + "/calendario/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(data)
    }).then(response => response.json()).then(result => { return result })
}

export async function Indesponivel(data) {
    console.log(data)
    return await fetch(URL + "/calendario/indisponivel/" + data, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json()).then(result => { return result })
}

export async function editEvents(data) {

    return await fetch(URL + "/calendario/edit/"+data.id, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(data)
    }).then(response => response.json()).then(result => { return result })
}

export async function deleteEvents(data) {

    console.log(data)

    return await fetch(URL + "/calendario/delete/" + data, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }).then(response => response.json()).then(result => { return result })
}