import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios, { Axios } from 'axios';
export const AdminStore = defineStore('admin',
()=>{
  const token = ref('');
  return {token}
}

)
