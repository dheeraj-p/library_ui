import { createLazyFileRoute } from '@tanstack/react-router';
import AllBooks from '../../../pages/AllBooks';

export const Route = createLazyFileRoute('/_authenticated/_dashboard/')({
  component: AllBooks,
});
