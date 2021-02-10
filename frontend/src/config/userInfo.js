const isUserExist = JSON.parse(localStorage.getItem("userInfo"));
export const headers = isUserExist ? {Authorization:`Bearer ${isUserExist.token}` } : {};
export const user= isUserExist ? isUserExist['name']: {};
// alert(headers.Authorization);
// console.log(isUserExist.token);

