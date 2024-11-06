import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNmJmNDMwNmU4ZWNjZTAxNTJlOTQ2OTViMDE1NmUyYyIsIm5iZiI6MTczMDY4NTcxNy43MTYyNzQzLCJzdWIiOiI2NzI4MjkyYjU1NDA4M2E1NmEwZDc5MmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.hCyL3EBsXJbnCi6uXwiyOkEaRt7_2CT4ihZrd8UBapw'
  }
});

export default instance;
