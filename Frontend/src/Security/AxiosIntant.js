import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8083",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const requestUrl = config.url || "";

 
  const publicRoutes = ["/auth"];

  const protectedPrefixes = ["/admin", "/user"];

  
  const isPublic = publicRoutes.some(route => requestUrl.includes(route));
  const isProtected = protectedPrefixes.some(prefix => requestUrl.includes(prefix));

  if (token && isProtected && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
