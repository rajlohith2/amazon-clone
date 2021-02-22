const isUserExist = JSON.parse(localStorage.getItem("userInfo"));
export const headers = isUserExist ? {headers:{Authorization:`Bearer ${isUserExist.token}` } }: null;
export const user= isUserExist ? isUserExist['name']: null;
