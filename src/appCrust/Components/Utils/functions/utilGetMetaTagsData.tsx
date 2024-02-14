import { AxiosResponse } from "axios";

export const utilGetMetaTagsData = (metaData: AxiosResponse<any, any>) => {
  // Function to add or update a meta tag
  function setMetaTag(name: string, content: string) {
    let head = document.getElementsByTagName("head")[0];
    let tag = document.querySelector(`meta[name="${name}"]`);

    if (tag) {
      tag.setAttribute("content", content);
    } else {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      tag.setAttribute("content", content);
      head.appendChild(tag);
    }
  }

  // Iterate over the metaData and set each meta tag
  for (let name in metaData) {
    setMetaTag(name, metaData[name]);
  }
};
