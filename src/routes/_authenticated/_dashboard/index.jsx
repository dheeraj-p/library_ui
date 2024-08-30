import { createFileRoute } from '@tanstack/react-router';
import LoadingView from '../../../components/LoadingView';

export const Route = createFileRoute('/_authenticated/_dashboard/')({
  pendingComponent: LoadingView,
  loader: ({ context }) => {
    return context.api.getAllBooks();
  },
});
