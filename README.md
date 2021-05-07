# gatsby-source-yuque

# Yuque Loader &middot; [![GitHub license][license-square]][license-url]

[![Egg.js][egg-square]][egg-url]
[![Semantic Release][semantic-release-square]][semantic-release-url]
[![NPM Version][npm-square]][npm-url]
[![Codecov][codecov-square]][codecov-url]

[license-square]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://github.com/ergatejs/gatsby-source-yuque/blob/HEAD/LICENSE
[egg-square]: https://img.shields.io/badge/Awesome-Egg.js-ff69b4.svg?style=flat-square
[egg-url]: https://eggjs.org/
[npm-square]: https://img.shields.io/npm/v/@ergatejs/gatsby-source-yuque.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@ergatejs/gatsby-source-yuque
[codecov-square]: https://img.shields.io/codecov/c/github/ergatejs/gatsby-source-yuque.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ergatejs/gatsby-source-yuque
[semantic-release-square]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release


> Gatsby source plugin for Yuque.


## Install

```sh
npm install @ergatejs/gatsby-source-yuque
```


## Usage

add plugin to your `gatsby-config.js`

```js
const dotenv = require("dotenv");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const YUQUE_GROUP = process.env.YUQUE_GROUP;
const YUQUE_TOKEN = process.env.YUQUE_TOKEN;
const YUQUE_ENDPOINT = process.env.YUQUE_ENDPOINT

module.exports = {
  // ...

  plugins: [
    // ...

    {
      resolve: `@ergatejs/gatsby-source-yuque`,
      options: {        
        queue: {
          concurrency: 20,
        },
        yuque: {
          token: process.env.YUQUE_TOKEN,
          endpoint: process.env.YUQUE_ENDPOINT,
        },
        group: YUQUE_GROUP,
        filter: {
          type: 'Book', // Book | Column
          // slug: 'slug'
        }
      }
    },    
  ],
};
```
