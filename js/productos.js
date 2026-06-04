/* Array principal de productos del e-commerce */
// Esto funciona como una "base de datos" simulada en el frontend
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Monstera Deliciosa",
    precio: 45.90,
    imagen: "https://static.wixstatic.com/media/b4df8d_29038c38771f4c67aa279995240d5717~mv2.jpg/v1/fill/w_520,h_693,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b4df8d_29038c38771f4c67aa279995240d5717~mv2.jpg",
    categoria: "interior",
    descripcion: "La favorita de las casas modernas. Sus hojas perforadas crecen grandes y purifican el aire de interiores con luz indirecta."
  },
  {
    id: 2,
    nombre: "Yucca Elephantipes",
    precio: 22.50,
    imagen: "https://www.houseplant.co.uk/cdn/shop/files/Indoor_Tropical_Yucca_Elephantipes_Elephant_Exotic_Air_Purifying_Easy_Care_Succulent_Houseplant.jpg?v=1738072702",
    categoria: "interior",
    descripcion: "Colgante, resistente y casi indestructible. Ideal para principiantes: tolera poca luz y riegos olvidados."
  },
  {
    id: 3,
    nombre: "Sansevieria (Lengua de Suegra)",
    precio: 35.00,
    imagen: "https://www.tiptonhurst.com/cdn/shop/files/Snake_Plant.png?v=1752507097",
    categoria: "interior",
    descripcion: "Planta arquitectónica de hojas verticales. Filtra toxinas del aire y necesita muy poco mantenimiento."
  },
  {
    id: 4,
    nombre: "Helecho Boston",
    precio: 28.50,
    imagen: "https://napuplant.com/cdn/shop/files/helecho-de-boston-7764834.png?v=1753308030",
    categoria: "interior",
    descripcion: "Follaje frondoso y elegante que ama la humedad. Perfecto para baños luminosos y rincones frescos."
  },
  {
    id: 5,
    nombre: "Cactus San Pedro",
    precio: 18.00,
    imagen: "https://res.cloudinary.com/fronda/image/upload/f_auto%2Cq_auto/productos/fol/11060/11060809_1.jpg?18-01-2023",
    categoria: "suculentas",
    descripcion: "Cactus columnar de crecimiento vertical. Requiere sol pleno y riego mínimo: la opción más resistente del vivero."
  },
  {
    id: 6,
    nombre: "Echeveria Rosa",
    precio: 12.90,
    imagen: "https://preview.redd.it/pastel-pink-echeveria-monroe-v0-13hyddys8tm41.jpg?width=640&crop=smart&auto=webp&s=d676a15ca2a17fcc8798dbd3f2620512481ed5ed",
    categoria: "suculentas",
    descripcion: "Suculenta en roseta con tonos pastel. Pequeña, decorativa y perfecta para escritorios y centros de mesa."
  },
  {
    id: 7,
    nombre: "Lavanda Aromática",
    precio: 24.00,
    imagen: "https://www.aprilplants.com/cdn/shop/products/Lavanda-dentata_14o_cotton_comprar-plantas-online_plantas-de-interior_1024x.jpg?v=1647853834",
    categoria: "exterior",
    descripcion: "Aromática de flores moradas que atrae polinizadores. Ideal para balcones soleados y jardines."
  },
  {
    id: 8,
    nombre: "Maceta de Cerámica",
    precio: 15.00,
    imagen: "https://media.adeo.com/media/4285794/media.jpg",
    categoria: "accesorios",
    descripcion: "Maceta artesanal de cerámica esmaltada con plato incluido. Drenaje inferior para raíces sanas."
  },
  {
    id: 9,
    nombre: "Sustrato Premium 5 kg",
    precio: 19.90,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_678750-MLA83134887903_032025-O.webp",
    categoria: "accesorios",
    descripcion: "Mezcla aireada con fibra de coco y humus. Mejora el drenaje y aporta nutrientes a tus plantas."
  }
];


/* Función para buscar un producto por su ID */
// Se usa en la página de detalle y probablemente en el carrito
function buscarProductoPorId(id) {

  return PRODUCTOS.find(producto => producto.id === Number(id));

  // find() recorre el array y devuelve el primer producto que coincida
  // Number(id) convierte el id (que puede venir como texto) a número
}