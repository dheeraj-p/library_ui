import { createLazyFileRoute } from '@tanstack/react-router';
import AddBooksBulk from '../../../pages/AddBooksBulk';

export const Route = createLazyFileRoute('/_authenticated/admin/add-book')({
  component: AddBooksBulk,
});
