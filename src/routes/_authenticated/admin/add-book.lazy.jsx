import { createLazyFileRoute } from '@tanstack/react-router';
import AddBooksBulk from '../../../pages/admin/AddBooksBulk';

export const Route = createLazyFileRoute('/_authenticated/admin/add-book')({
  component: AddBooksBulk,
});
