/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import { threadId } from 'worker_threads'

const Pkg = require('../package.json')

const Webflow = require('webflow-api')

type WebflowProviderOptions = {}

function WebflowProvider(this: any, options: WebflowProviderOptions) {
  const seneca: any = this

  const entityBuilder = this.export('provider/entityBuilder')

  seneca.message('sys:provider,provider:webflow,get:info', get_info)

  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'webflow',
      version: Pkg.version,
      sdk: {
        name: 'webflow',
        version: Pkg.dependencies['webflow-api'],
      },
    }
  }

  entityBuilder(this, {
    provider: {
      name: 'webflow',
    },
    entity: {
      site: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {
              let res = await this.shared.sdk.sites()
              let list = res.map((data: any) => entsize(data))
              return list
            },
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      webhook: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          remove: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      collection: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      item: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          remove: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      product_SKU: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      order: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      inventory: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      settings: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },

      user: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          save: {
            action: async function (this: any, entsize: any, msg: any) {},
          },

          remove: {
            action: async function (this: any, entsize: any, msg: any) {},
          },
        },
      },
    },
  })

  seneca.prepare(async function (this: any) {
    let token = await this.post(
      'sys:provider,get:keymap,provider:webflow,key:token'
    )

    this.shared.sdk = new Webflow(token.value)
  })

  return {
    exports: {
      sdk: () => this.shared.sdk,
    },
  }
}

// Default options.
const defaults: WebflowProviderOptions = {
  // TODO: Enable debug logging
  debug: false,
}

Object.assign(WebflowProvider, { defaults })

export default WebflowProvider

if ('undefined' !== typeof module) {
  module.exports = WebflowProvider
}
