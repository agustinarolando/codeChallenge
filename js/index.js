function trueData(data) {
    //Filtra los tipos de datos guardados en la api
    return typeof data !== "object" && data !== "" && data !== undefined && data !== null;
};

function sendData() {
    //Envía los datos, muestra una alerta y reinicia los campos de los inputs
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let group = document.getElementById("group").value;
    let room = document.getElementById("room").value;

    fetch ('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo264', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            nombre : name,
            apellido : surname,
            grupo : group,
            sala: room,
        })
    })
    .then(response => response.json())
    .catch((error) => console.error("Error:", error))
    setTimeout(()=>{
        document.getElementById("sendAlert").classList.remove("show");
    }, "2000");
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("group").value = "";
    document.getElementById("room").value = "";
};

function getData() {
    //Trae los datos de la api, les da una estructura y los agrega en forma de lista
    fetch("https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo264")
    .then(response => response.json())
    .then(data => {
        let htmlContent = "";

        for (let i = 0; i < data.length; i++) {
            if (trueData(data[i].nombre) && trueData(data[i].apellido) && trueData(data[i].grupo) && trueData(data[i].sala)) {
                htmlContent += `
                    <tr id="${data[i]._id}">
                        <td class="pb-0">${data[i].nombre}</td>
                        <td class="pb-0">${data[i].apellido}</td>
                        <td class="pb-0">${data[i].grupo}</td>
                        <td class="pb-0">${data[i].sala} <button onclick="deleteData('${data[i]._id}')" type="button" class="btn" data-bs-toggle="collapse" data-bs-target="#deleteAlert"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button> </td>
                    </tr>
                `;
            }
        }

        document.getElementById("tbody").innerHTML = htmlContent;
    });
};

function deleteData(id) {
    //Borra un dato y muestra una alerta
    fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo264/${id}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'DELETE'
    })
    .then(response =>console.log(response))
    setTimeout(()=>{
        document.getElementById("deleteAlert").classList.remove("show");
    }, "2000");
}

document.addEventListener("DOMContentLoaded", ()=>{

    document.getElementById("send").addEventListener("click", sendData);
    //Recarga la página cada 1.5 segundos
    setInterval(getData, "1500");
});