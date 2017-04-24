# [MEAN](http://mean.io/) Lineman Server

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## MongoDB Express NodeJS

### Requirements

-   [Node](https://doc.ubuntu-fr.org/nodejs#depuis_un_ppa)
-   [MongoDB](https://doc.ubuntu-fr.org/mongodb#installation)
-   [Nodemon](http://nodemon.io/)

### Execution

#### Installation

```bash
cd server
npm install
npm run createAdmin
curl -d "email=admin@mail.com&password=12345&isAdmin=true" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/
```

#### Development

```bash
nodemon --exec npm start
```

#### Production

```bash
SECRET_TOKEN='secretToken' MONGODB_URI='mongodb://localhost:27017/mean-lineman-server' npm start
```
