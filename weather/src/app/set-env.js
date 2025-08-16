const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));

const envFile = `export const environment = {
  production: false,
  apiKey: '${envConfig.API_KEY}'
};
`;

fs.writeFileSync('./src/environments/environment.ts', envFile);
fs.writeFileSync('./src/environments/environment.prod.ts', envFile);
console.log('API key set in environment files.');