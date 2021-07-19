import axios from 'axios'
export const shipping = JSON.parse(localStorage.getItem("shipping"))?JSON.parse(localStorage.getItem("shipping")):null;
export const PROD_URL = `/api`
// export const PROD_URL = `https://jz-amazona.herokuapp.com/api`