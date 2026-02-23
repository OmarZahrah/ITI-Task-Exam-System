import { getCurrentUser } from "./utils.js";

const user = getCurrentUser();

if (!user) {

    window.location.href = "index.html";

}