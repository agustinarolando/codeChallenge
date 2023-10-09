// function trueData(data) {
//     //Filtra los tipos de datos guardados en la api
//     return typeof data !== "object" && data !== "" && data !== undefined && data !== null;
// };

function sendData() {
    //Envía los datos, muestra una alerta y reinicia los campos de los inputs
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let group = document.getElementById("group").value;
    let room = document.getElementById("room").value;

    if (name === "" || surname === "" || group === "" || room === "" || name === null || surname === null || group === null || room === null) {
        document.getElementById("fillAlert").classList.remove("collapse");
        setTimeout(()=>{
            document.getElementById("fillAlert").classList.add("collapse");        
        }, "2000");
        console.log("Alerta Formulario sin completar");
    } else {
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
        document.getElementById("sendAlert").classList.remove("collapse");
        setTimeout(()=>{
            document.getElementById("sendAlert").classList.add("collapse");
        }, "2000");
        document.getElementById("name").value = "";
        document.getElementById("surname").value = "";
        document.getElementById("group").value = "";
        document.getElementById("room").value = "";
    };
};

async function getData() {
    try {
        fetch("https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo264")
        .then(response => response.json())
        .then(data => {
            let htmlContent = "";

            for (let i = 0; i < data.length; i++) {

                htmlContent += `
                    <div class="position-relative">
                        <div class="card mb-2 g-0" id="${data[i]._id}">
                            <div class="row text-center">
                                <div class="col-lg-3 m-0">
                                    <div class="card-body">
                                        <p class="card-text">${data[i].nombre}</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 m-0">
                                    <div class="card-body">
                                        <p class="card-text">${data[i].apellido}</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 m-0">
                                    <div class="card-body">
                                        <p class="card-text">${data[i].grupo}</p>
                                    </div>
                                </div>
                                <div class="col-lg-3 m-0">
                                    <div class="card-body">
                                        <p class="card-text">${data[i].sala}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="position-absolute top-50 end-0 translate-middle-y">
                            <button style="margin-right: 15px;" onclick="modifyUser('${data[i]._id}')" type="button" class="btn mr-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
                            </button>
                            <button style="margin-right: 20px;" onclick="deleteData('${data[i]._id}')" type="button" class="btn mr-5" data-bs-toggle="collapse" data-bs-target="#deleteAlert">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                            </button>
                        </div>
                    </div>
                    `;

                // if (trueData(data[i].nombre) && trueData(data[i].apellido) && trueData(data[i].grupo) && trueData(data[i].sala)) {}
            }

            document.getElementById("table").innerHTML = htmlContent;
        });

    } catch (error) {
        console.log("Error: ", error);
    }
    //Trae los datos de la api, les da una estructura y los agrega en forma de lista
    
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
        getData();
    }, "1500");
}

function modifyUser(id) {
    localStorage.setItem("user", id);
    window.location.href="edit.html";
}

document.addEventListener("DOMContentLoaded", ()=>{

    document.getElementById("send").addEventListener("click", sendData);
    //Recarga la página cada 1.5 segundos
    setInterval(getData, "1500");
});