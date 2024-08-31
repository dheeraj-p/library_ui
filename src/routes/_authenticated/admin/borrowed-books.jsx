import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/admin/borrowed-books')({
  loader: ({ context }) => {
    return context.api.fetchAllBorrowedBooks();
  },
});
