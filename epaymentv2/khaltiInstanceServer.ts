import axios from "axios";

export const khaltiInstanceServer = axios.create({
  baseURL: "https://a.khalti.com/api/v2",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Key f79110302bbf46828fca3a7b7514da97`, // live secret key
  },
  responseType: "json",
});
