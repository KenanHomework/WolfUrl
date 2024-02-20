import { post, get } from "./request.js";

export const shortLink = (data) => post("url/short", data);

export const getLinks = () => get("url/");

export const getLink = (backHalf) => get(`url/${backHalf}`);
