/*---------------------------------------
  Allows Typescript to import data from a 
  json file instead of using a filestream 
  Google: 'Typescript Declaration Files' 
  for more information on *.d.ts files.  
-----------------------------------------*/
declare module "*.json" {
  const value: any;
  export default value;
}