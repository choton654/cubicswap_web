import axios from "axios";
import jwt_decode from "jwt-decode";

const appState = () => {
  let token = "";
  let decode = { role: "", id: "", phone: "", exp: Date.now() / 1000 };

  if (typeof window !== "undefined") {
    // token = Cookies.get("token");
    // token = document.cookies;
    token = localStorage.getItem("token") || "";

    if (token) {
      decode = jwt_decode(token);
      // console.log(decode);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  return {
    token,
    decode,
  };
};

export default appState;
