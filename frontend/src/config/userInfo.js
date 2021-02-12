const isUserExist = JSON.parse(localStorage.getItem("userInfo"));
export const headers = isUserExist ? {headers:{Authorization:`Bearer ${isUserExist.token}` } }: null;
export const user= isUserExist ? isUserExist['name']: null;
// alert(headers.Authorization);
// console.log(isUserExist.token);
//{headers: {Authorization:`Bearer ${userInfo.token}`},}

