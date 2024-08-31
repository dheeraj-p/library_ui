import { createLazyFileRoute } from '@tanstack/react-router';
import BorrowedBooks from '../../../pages/admin/BorrowedBooks';

export const Route = createLazyFileRoute(
  '/_authenticated/admin/borrowed-books'
)({
  component: BorrowedBooks,
});
