function sentHTMLImage(name, url) {
    return `
    <html style="height: 100%;">
  <head>
    <meta name="viewport" content="width=device-width, minimum-scale=0.1" />
    <meta property="image" content="${url}" />
    <meta property="og:image" content="${url}" />
    <meta property="twitter:image" content="${url}" />
    <title>${name}</title>
  </head>
  <body style="margin: 0px; background: #0e0e0e; height: 100%; display: flex">
    <img
      alt="${name}"
      style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;"
      src="${url}"
    />
    <div data-v-e9185a48=""><!----></div>
    <iframe
      id="nr-ext-rsicon"
      style="position: absolute; display: none; width: 50px; height: 50px; z-index: 2147483647; border-style: none; background: transparent;"
    ></iframe>
  </body>
</html>
    `;
}
module.exports = sentHTMLImage;
