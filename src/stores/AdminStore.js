import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios, { Axios } from 'axios';
export const AdminStore = defineStore('admin',
()=>{
  const userInfo = ref({});
  return{userInfo}
}

)
