import axios from 'axios';

// Configurar el token globalmente en Axios
const token = 'Tu token aquí';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Crear un interceptor para manejar errores de solicitud
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error en la solicitud: ', error);
    return Promise.reject(error);
  }
);

export default axios;
