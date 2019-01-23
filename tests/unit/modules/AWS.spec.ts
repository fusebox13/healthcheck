import { expect } from "chai";
import { AWS } from "@/modules/AWS"


//Fetch has issues with Typescript.  Don't write a test that
//ends up calling fetch because it'll throw errors in the build
//Appears to be fixed with isomorphic fetch registered globally
describe('AWS', () => {
  context('HealthCheckLambda', () => {
    it('should put an item into Dynamo', () => {
      let item = {
        id: "testid",
        value: "test value"
      }
      let lambda = new AWS.Lambda();
      //let items = lambda.getItems('MyTable') 
      //lambda.putItem(item)
    });
  });
});