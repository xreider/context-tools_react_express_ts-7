# in this folder

yarn inst-all

---

# in ./server/

### CREATE .env.development and .env.production

### with content:

DB=mongodb://127.0.0.1:27017/any  
PROTOCOL=http  
DOMAIN=localhost  
PORT=4000  
BASE_URL=localhost:4000  
EMAIL=EMAIL_FOR_NODEMAILER  
EMAIL_PASSWORD=EMAIL_PASSWORD_FOR_NODEMAILER  
SECRET=any  
SALT=10
ORIGIN=http://localhost:3000

---

# in ./client/

### create .env.development with content:

PROTOCOL=http  
DOMAIN=localhost  
PORT=3000  
BASE_URL=localhost:3000  
API=http://localhost:4000

### create .env.production with content:

PROTOCOL=http  
DOMAIN=localhost  
PORT=80  
BASE_URL=localhost:80  
API=http://localhost:4000

Во влкдаках браузера в scripts / for HSK.WiKi / Logo есть варианты каким сделать шар.
Продолжить с этого
