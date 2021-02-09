//const { useSelector } = require("react-redux");
export const headers = JSON.parse(localStorage.getItem("userInfo"))['token'];
export const user= JSON.parse(localStorage.getItem("userInfo"))["name"];

/*
const loggedInUser = useSelector(state=>state.userSignin);
    const {userInfo} = loggedInUser;
*/