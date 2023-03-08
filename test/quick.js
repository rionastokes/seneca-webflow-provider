const Webflow = require('webflow-api')
const Token = require('./local-env').WEBFLOW_ACCESSTOKEN

run()

async function run() {
  // initialize the client with the access token
  const webflow = new Webflow({ Token })

  const col = await webflow.collection({
    collectionId: '',
  })
  const colItems = await col.items()
  console.log(colItems)
}
