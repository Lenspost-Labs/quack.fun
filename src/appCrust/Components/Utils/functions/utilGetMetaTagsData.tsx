export const getAllMetaTags = () => {
  const metas = document.querySelectorAll("meta");
  const metaInfos: { property: string; content: string }[] = [];

  metas.forEach((meta) => {
    // Extract the property and content attributes
    const property = meta.getAttribute("property");
    const content = meta.getAttribute("content");

    if (property && content) {
      metaInfos.push({ property, content });
    }
  });

  return metaInfos;
};
