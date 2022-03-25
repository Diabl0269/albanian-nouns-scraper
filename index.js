import fs from "fs";
import axios from "axios";
import { parse } from "node-html-parser";

const baseUrl = "https://en.wiktionary.org";
let url = `${baseUrl}/wiki/Category:Albanian_nouns`;

const nextPageText = "next page";

const nouns = [];
let nextPageExists = true;

const getContainerData = (container) => {
  const data = container
    .querySelector(".mw-category-columns")
    .querySelectorAll("a");
  data.forEach((i) => {
    nouns.push(i.innerHTML);
  });
};

const getContainer = (page) => page.querySelector("#mw-pages");

const getNextLink = (container) =>
  container.childNodes.find(
    ({ tagName, innerHTML }) => tagName === "A" && innerHTML === nextPageText
  )?.attributes?.href;

const getPage = async (pageUrl) => {
  const res = await axios(pageUrl);
  return parse(res.data);
};

const scrapData = async () => {
  while (nextPageExists) {
    let page = await getPage(url);
    let container = getContainer(page);
    getContainerData(container);
    url = getNextLink(container);

    if (!url) {
      nextPageExists = false;
    } else {
      url = `${baseUrl}${url}`;
    }
  }

  fs.writeFileSync("nouns.json", JSON.stringify(nouns));
};

scrapData();
