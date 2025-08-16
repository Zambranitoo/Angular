const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '.env');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

const apiKey = envConfig.API_KEY_WEATHER || '';

const envContent = `export const environment = {\n  production: false,\n  apiKey: '${apiKey}'\n};\n`;
const envProdContent = `export const environment = {\n  production: true,\n  apiKey: '${apiKey}'\n};\n`;

const envDir = path.resolve(__dirname, 'src', 'environments');
const envFile = path.join(envDir, 'environment.ts');
const envProdFile = path.join(envDir, 'environment.prod.ts');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

fs.writeFileSync(envFile, envContent);
fs.writeFileSync(envProdFile, envProdContent);
console.log('API key copiada a environment.ts y environment.prod.ts');
