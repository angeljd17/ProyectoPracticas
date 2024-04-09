import axios from 'axios';

const token = 'Tu token aquí';

const fetchMovies = async (page) => {
  try {
    const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies: ', error);
    throw error; // Re-lanzamos el error para manejarlo en el componente que llame a esta función
  }
};

export { fetchMovies };
