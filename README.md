# gatsby-source-yuque

Gatsby source plugin for Yuque.

## Usage

install plugin

```bash
$ npm i @ergatejs/gatsby-source-yuque
```

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
