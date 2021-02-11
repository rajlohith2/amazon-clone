const isUserExist = JSON.parse(localStorage.getItem("userInfo"));
export const headers = isUserExist ? {headers:{Authorization:`Bearer ${isUserExist.token}` } }: {};
export const user= isUserExist ? isUserExist['name']: {};
// alert(headers.Authorization);
// console.log(isUserExist.token);
//{headers: {Authorization:`Bearer ${userInfo.token}`},}

