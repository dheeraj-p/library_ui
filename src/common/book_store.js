import { useRouteContext } from '@tanstack/react-router';

const createBookStore = (booksLoader) => {
  let books = [];
  let latestId = 0;
  let lastFetchedBooks = [];
  let hasFetchedOnce = false;

  const loadMore = async () => {
    const newBooks = await booksLoader(latestId, 10);
    lastFetchedBooks = newBooks;
    books = books.concat(newBooks);
    latestId = newBooks.at(-1)?.id ?? latestId;
    hasFetchedOnce = true;
    return books;
  };

  const areAllBooksFetched = () => {
    return lastFetchedBooks.length === 0 && hasFetchedOnce;
  };

  return {
    getBooks: () => books,
    loadMore,
    areAllBookedFetched: areAllBooksFetched,
  };
};

const useBookStore = () => {
  const { bookStore } = useRouteContext({});
  return bookStore;
};

export { createBookStore, useBookStore };
