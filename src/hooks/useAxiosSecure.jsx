import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
