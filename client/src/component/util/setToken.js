import axios from "axios";
export default function (token) {
   if (token) {
      axios.defaults.headers.common["auth-token"] = token;
   } else {
      axios.defaults.headers.common["auth-token"] = null;
   }
}
