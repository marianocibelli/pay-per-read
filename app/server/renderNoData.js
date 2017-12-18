import jsonAssets from '../webpack-assets.json';
let jsArray = '';
let cssArray = '';
for(let bundle of Object.entries(jsonAssets).reverse()){
  if(bundle[1] && bundle[1]['js']){
      jsArray += `<script src="${bundle[1]['js']}"></script> \n`
  }
  if (bundle[1] && bundle[1]['css']){
        cssArray += `<link rel="stylesheet" href="${bundle[1]['css']}"> \n`
      }
}

export default function renderNoData(html) {
  return `
    <!doctype html>
    <html>
    <head>
      <title> Not Found </title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0">
      <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/core/2.0.5/core.min.css" />
      <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/components/2.0.0/components.min.css" />
      ${cssArray}
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
