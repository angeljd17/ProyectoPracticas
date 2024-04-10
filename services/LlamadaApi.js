import axios from 'axios';

const token = 'Tu token aquí';

const fetchMovieDetails = async (movieId) => {
  try {
    const token = 'Tu token aquí';
    const response = await axios.get(`https://api-w6avz2it7a-uc.a.run.app/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const movieData = response.data[movieId]; // Obtenemos los detalles de la película del objeto con el ID
    return movieData;
  } catch (error) {
    console.error('Error fetching movie details: ', error);
    throw error;
  }
};


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
    throw error;
  }
};

export { fetchMovieDetails };
export { fetchMovies };