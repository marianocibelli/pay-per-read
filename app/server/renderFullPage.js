import jsonAssets from '../webpack-assets.json';
let jsArray = '';
for(let bundle of Object.entries(jsonAssets).reverse()){
  if(bundle[1] && bundle[1]['js']){
      jsArray += `<script src="${bundle[1]['js']}"></script> \n`
  }
}

export default function renderFullPage(html, preloadedState) {

  return `
    <!doctype html>
    <html>
    <head>
      <title> Book data </title>
    </head>
    <body>
      <div id="root">
        ${html}
      </div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      ${jsArray}
    </body>
    </html>
  `
}
