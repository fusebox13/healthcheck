import {AppConfiguration as Configuration, AppConfiguration} from "@/AppConfiguration"

export namespace AWS {

  export class Lambda {
    rootUrl: string
    apiKey: string

    constructor() {
      let config: Configuration = Configuration.getInstance()
      this.rootUrl = config.aws.rootUrl
      this.apiKey = config.aws.apiKey
    }
    getItems(table: string) : any {
      return fetch(`${this.rootUrl}?TableName=${table}`, {
          method: 'GET',
          mode: 'cors',
          cache: 'default',
          headers: {
            'x-api-key': this.apiKey
          }
        })
    }

    putItem(item: any) {
      let requestBody = {
        TableName: "MyTable",
        Item: item
      }

      return fetch(this.rootUrl, {
          method: 'POST',
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify(requestBody),
          headers: {
            'x-api-key': this.apiKey
          }
        })
    }
  }
}
