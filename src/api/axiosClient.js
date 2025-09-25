import axios from 'axios';

const axiosClient = axios.create({
  baseURl: import.meta.VITE_API_BASE_URL,
});

export default axiosClient;
