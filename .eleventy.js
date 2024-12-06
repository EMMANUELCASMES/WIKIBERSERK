const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Configurar copias directas para recursos estáticos
  eleventyConfig.addPassthroughCopy("code/css");
  eleventyConfig.addPassthroughCopy("code/js");
  eleventyConfig.addPassthroughCopy("code/img");

  // Agregar soporte para colecciones
  eleventyConfig.addCollection("blog", (collectionApi) => {
    // Filtrar por los archivos `.md` (artículos)
    return collectionApi.getFilteredByGlob("./code/*.md").sort((a, b) => {
      // Ordenar los artículos por fecha (descendente)
      return b.date - a.date;
    });
  });

  // Configurar un plugin de Eleventy
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  return {
    dir: {
      input: "code", // Carpeta de entrada
      output: "docs", // Carpeta de salida para GitHub Pages
      includes: "../_includes", // Plantillas comunes
      layouts: "../_includes", // Layouts reutilizables
    },
    templateFormats: ["njk", "md"], // Formatos permitidos
  };
};
