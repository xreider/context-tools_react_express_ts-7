----------------------------- some tips -----------------------------

"scripts": {  
"dev": "cross-env NODE_ENV=development nodemon --exec ts-node -- -r tsconfig-paths/register src/server/index.ts",  
"build": "rimraf build & tsc",  
"start": "cross-env NODE_ENV=production node -r ts-node/register/transpile-only -r tsconfig-paths/register build/server/index.js"  
},

https://www.npmjs.com/package/tsc-alias  
"scripts": {  
"build": "tsc && tsc-alias",  
"build:watch": "tsc -w & tsc-alias -w"  
}
