import jsonAssets from '../webpack-assets.json';
let jsArray = '';
for(let bundle of Object.entries(jsonAssets).reverse()){
  if(bundle[1] && bundle[1]['js']){
      jsArray += `<script src="${bundle[1]['js']}"></script> \n`
  }
}

export default function renderNoData(html) {
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
      ${jsArray}
    </body>
    </html>
  `
}
