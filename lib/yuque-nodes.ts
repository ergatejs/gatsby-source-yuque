import createNodeHelpers from 'gatsby-node-helpers';

const { createNodeFactory } = createNodeHelpers({
  typePrefix: 'Yuque',
});

const DOC = 'Doc';
const DOC_DETAIL = 'DocDetail';
const BOOK = 'Book';
const BOOK_DETAIL = 'BookDetail';

export const DocNode = createNodeFactory(DOC);
export const DocDetailNode = createNodeFactory(DOC_DETAIL);
export const BookNode = createNodeFactory(BOOK);
export const BookDetailNode = createNodeFactory(BOOK_DETAIL);
