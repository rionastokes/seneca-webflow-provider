const Webflow = require('webflow-api')
const token = require('./local-env').WEBFLOW_ACCESSTOKEN

run()

async function run() {
  // initialize the client with the access token
  const webflow = new Webflow({ token })

  const sites = await webflow.sites()
  console.log(sites)
}
