import fs from 'fs';
import url from 'url';
import path from 'path';
import jsdom from 'jsdom';
import crypto from 'crypto';
import urllib from 'urllib';

import Debug from 'debug';
import Loader from 'yuque-loader';

import { types as YuqueTypes } from './lib/yuque-schema';
import {
  DocNode,
  DocDetailNode,
  BookNode,
  BookDetailNode,
} from './lib/yuque-nodes';

const debug = Debug('gatsby-source-yuque');
const { JSDOM } = jsdom;


export const sourceNodes = async ({ actions, reporter }, options: IOption) => {
  const { createNode } = actions;

  debug('options', options);

  const { user, group, queue, yuque, filter, assets } = options;
  const { dirPrefix = '/' } = assets || {};

  const STATIC_DIR = path.resolve('static');

  const loader = new Loader({
    yuque,
    queue,
  });

  const { books } = await loader.getRepos(user || group || '', filter);

  await Promise.all(books.map(async book => {
    createNode(BookNode(book));

    const { namespace } = book;
    const { book: bookDetail, docs } = await loader.getRepo(namespace);

    createNode(BookDetailNode(bookDetail));

    await Promise.all(
      docs.map(async doc => {


        createNode(DocNode(doc));

        const { slug: docSlug } = doc;

        loader.queue.add(async () => {

          const doc = await loader.getDoc(namespace, docSlug);

          const { slug, body_html } = doc;

          if (!body_html) {
            return;
          }

          const dom = new JSDOM(body_html);

          dom.window.document.querySelectorAll('img').forEach(async img => {
            const originUrl = img.src;

            if (originUrl.startsWith('data:image')) {
              return;
            }

            const { pathname } = new url.URL(originUrl);
            const { ext } = path.parse(pathname);

            const hash = crypto.createHash('sha256').update(originUrl).digest('hex');
            const target = `${hash}${ext}`;

            const targetDir = path.join(STATIC_DIR, dirPrefix);
            const targetAsset = path.join(targetDir, target);
            const targetUrl = path.join(dirPrefix, target);

            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir);
            }

            if (!fs.existsSync(targetAsset)) {
              reporter.info(`Download:doc:${slug}:asset from ${originUrl} to ${targetAsset}`);

              const { data } = await urllib.request(originUrl);
              fs.writeFileSync(targetAsset, data);
            }

            img.src = targetUrl;
          });

          doc.body_html = dom.window.document.body.innerHTML;

          createNode(DocDetailNode(doc));
        });
      }),
    );
  }));

  // done
  await loader.queue.onIdle();

  return;
};

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(YuqueTypes);
};

interface IOption {
  group?: string;
  user?: string;
  queue: {
    concurrency: number;
  };
  yuque: {
    token?: string;
    endpoint?: string;
    userAgent?: string;
  };
  filter?: {
    type?: string;
    slug?: string;
    public?: number;
  };
  assets?: {
    dirPrefix?: string;
  }
}
