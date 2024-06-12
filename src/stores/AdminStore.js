import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios, { Axios } from 'axios';
export const AdminStore = defineStore('admin',
()=>{
  const userInfo = ref({});
  const profileServerPath = ref('http://175.178.152.182:8090/profile/');
  const noteServerPath = ref('http://175.178.152.182:8090/note/')
  return{userInfo,profileServerPath,noteServerPath}
}

)
