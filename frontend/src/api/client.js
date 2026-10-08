import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api',withCredentials:true});
let getToken=()=>null;export const setTokenGetter=fn=>getToken=fn;
api.interceptors.request.use(c=>{const t=getToken();if(t)c.headers.Authorization=`Bearer ${t}`;return c});
