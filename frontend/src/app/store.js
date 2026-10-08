import {configureStore,createSlice} from '@reduxjs/toolkit';
const authSlice=createSlice({name:'auth',initialState:{user:null,accessToken:null},reducers:{setAuth:(s,a)=>({...s,...a.payload}),logout:s=>{s.user=null;s.accessToken=null}}});
const eventsSlice=createSlice({name:'events',initialState:{items:[],loading:false},reducers:{setEvents:(s,a)=>{s.items=a.payload},setLoading:(s,a)=>{s.loading=a.payload}}});
export const {setAuth,logout}=authSlice.actions;export const {setEvents,setLoading}=eventsSlice.actions;export const store=configureStore({reducer:{auth:authSlice.reducer,events:eventsSlice.reducer}});
