import { createFileRoute } from '@tanstack/react-router';
import LoadingView from '../../../components/LoadingView';

export const Route = createFileRoute(
  '/_authenticated/_dashboard/currently-reading'
)({
  pendingComponent: LoadingView,
  loader: async ({ context }) => {
    return context.api.fetchCurrentlyReadingBooks();
  },
});
