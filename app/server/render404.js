export default function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
    <head>
      <title> Not Found </title>
    </head>
    <body>
      <div id="root">
        ${html}
      </div>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `
}
