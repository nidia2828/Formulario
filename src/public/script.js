// Ventanas flotantes
const modalSobre = document.getElementById('modalSobre');
const modalGaleria = document.getElementById('modalGaleria');
const modalContacto = document.getElementById('modalContacto');

const openSobre = document.querySelector('a[href="#sobre-nosotros"]');
const openGaleria = document.querySelector('a[href="#galeria"]');
const openContacto = document.querySelector('a[href="#contacto"]');

const closeBtns = document.querySelectorAll('.close');

openSobre.addEventListener('click', e => { e.preventDefault(); modalSobre.classList.add('active'); });
openGaleria.addEventListener('click', e => { e.preventDefault(); modalGaleria.classList.add('active'); cargarGaleria(); });
openContacto.addEventListener('click', e => { e.preventDefault(); modalContacto.classList.add('active'); });

closeBtns.forEach(btn => btn.addEventListener('click', () => { btn.parentElement.parentElement.classList.remove('active'); }));
window.addEventListener('click', e => {
  [modalSobre, modalGaleria, modalContacto].forEach(modal => { if(e.target === modal) modal.classList.remove('active'); });
});

// Formulario animales
const form = document.getElementById('animalForm');
const list = document.getElementById('animalList');

const mostrarAnimales = animales => {
  list.innerHTML = '';
  animales.forEach(a => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${a.nombre}</strong> (${a.especie}, ${a.edad} años) - Propietario: ${a.propietario} (${a.telefono})`;
    list.appendChild(li);
  });
};

const cargarAnimales = async () => {
  try {
    const res = await fetch('/api/animales');
    const data = await res.json();
    mostrarAnimales(data);
  } catch (err) { console.error(err); }
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  const animal = {
    nombre: document.getElementById('nombre').value,
    especie: document.getElementById('especie').value,
    edad: parseInt(document.getElementById('edad').value),
    propietario: document.getElementById('propietario').value,
    telefono: document.getElementById('telefono').value
  };

  console.log("📥 Enviando animal:", animal);

  try {
    const res = await fetch('/api/animales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animal)
    });
    const data = await res.json();
    console.log("📤 Respuesta del servidor:", data);
    form.reset();
    cargarAnimales();
  } catch (err) { console.error(err); }
});

// Galería
const galeriaImgs = [
  { src: 'img/baños.jpg', desc: 'Baños y aseo profesional' },
  { src: 'img/guarderia.jpg', desc: 'Guardería y hospedaje' },
  { src: 'img/peluqueria.jpg', desc: 'Peluquería canina/felina' },
  { src: 'img/suplementos.jpg', desc: 'Tienda de suplementos de calidad' },
  { src: 'img/juguetes.jpg', desc: 'Tienda de juguetes y accesorios' }
];

const cargarGaleria = () => {
  const galeria = document.querySelector('.galeria');
  galeria.innerHTML = '';
  galeriaImgs.forEach(img => {
    const div = document.createElement('div');
    div.classList.add('galeria-item');
    div.innerHTML = `<img src="${img.src}" alt="${img.desc}"><p>${img.desc}</p>`;
    galeria.appendChild(div);
  });
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => { cargarAnimales(); });
