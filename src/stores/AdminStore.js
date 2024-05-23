import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios, { Axios } from 'axios';
export const AdminStore = defineStore('admin',
()=>{
  const account = ref();
  const refreshtoken =(async ()=>{
    let refreshInstance = axios.create( {
      baseURL:"https://localhost:7104",
      timeout:1000
    } );
    let res = await refreshInstance.post("api/Login/CheckTokenIsExpired",account.value);
    if(res.data.code ===500)
    return false;
    else
    return res.data.data;

  })
  return {account,password,token}
}

)
