import { loadHeaderFooter, getParam } from "./utils.mjs";
import relationshipdata from "./relationshipdata.mjs";
import relationshipList from "./relationshipList.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".categoryList");
const category = getParam("category");
const datasource = new relationshipdata(category);
const list = new relationshipList(category, datasource, listElement);

list.init();
