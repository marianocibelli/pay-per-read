import jsonAssets from '../statics/webpack-assets.json';
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

export default function renderFullPage(html, preloadedState) {

  return `
    <!doctype html>
    <html>
    <head>
      <title> Book data </title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0">
      <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/react-components/1.0.2/react-components.css" />
      <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/core/2.0.5/core.min.css" />
      <link rel="stylesheet" href="https://cdn.auth0.com/styleguide/components/2.0.0/components.min.css" />
      ${cssArray}
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
