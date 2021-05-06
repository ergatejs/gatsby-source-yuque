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

export const sourceNodes = async ({ actions }, options: IOption) => {
  const { createNode } = actions;

  debug('options', options);

  const { user, group, queue, yuque, filter } = options;

  // init
  const loader = new Loader({
    yuque,
    queue,
  });

  // load books
  const { books } = await loader.getRepos(user || group || '', filter);

  await Promise.all(books.map(async book => {

    // create book
    createNode(BookNode(book));

    const { namespace } = book;

    const { book: bookDetail, docs } = await loader.getRepo(namespace);

    // create book detail
    createNode(BookDetailNode(bookDetail));

    await Promise.all(
      docs.map(async doc => {

        // create doc
        createNode(DocNode(doc));

        const { slug: docSlug } = doc;

        loader.queue.add(async () => {
          const doc = await loader.getDoc(namespace, docSlug);

          // create doc detail
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
}
