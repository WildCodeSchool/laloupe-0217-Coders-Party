![Lineman build](https://travis-ci.org/JbPasquier/mean-lineman.svg?branch=master)

# [MEAN](http://mean.io/) Starter with [Lineman](http://linemanjs.com/)

## Angular

### Requirements

-   [Node](https://doc.ubuntu-fr.org/nodejs#depuis_un_ppa)
-   [MongoDB](https://doc.ubuntu-fr.org/mongodb#installation)
-   [Nodemon](http://nodemon.io/)

### Execution

#### Installation

```bash
git clone git@github.com:JbPasquier/mean-lineman.git
cd mean-lineman
npm install
```

#### API installation

```bash
npm run createAdmin
curl -d "email=admin@mail.com&password=12345&isAdmin=true" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/
```

#### Development

```bash
npm start
```

#### Development API

```bash
nodemon --exec npm run server
```

#### Production

```bash
npm run production
```

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
