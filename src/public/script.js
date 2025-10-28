document.getElementById("userForm").addEventListener("submit", async function (event) {

    event.preventDefault();

 

    const nombre = document.getElementById("nombre").value;

    const correo = document.getElementById("correo").value;

 

    const response = await fetch("/api/datos", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ nombre, correo })

    });

 

    if (response.ok) {

        alert("Usuario agregado");

        cargarUsuarios();

    } else {

        alert("Error al agregar usuario");

    }

});

 

// Cargar usuarios al cargar la página

async function cargarUsuarios() {

    const response = await fetch("/api/datos");

    const usuarios = await response.json();

   

    const userList = document.getElementById("userList");

    userList.innerHTML = "";

    usuarios.forEach(user => {

        const li = document.createElement("li");

        li.textContent = `${user.nombre} - ${user.correo}`;

        userList.appendChild(li);

    });

}

cargarUsuarios();