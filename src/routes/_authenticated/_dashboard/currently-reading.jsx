import { createFileRoute } from '@tanstack/react-router';
import LoadingView from '../../../components/LoadingView';
import ErrorPlaceHolder from '../../../components/ErrorPlaceholder';

export const Route = createFileRoute(
  '/_authenticated/_dashboard/currently-reading'
)({
  pendingComponent: LoadingView,
  errorComponent: ErrorPlaceHolder,
  loader: async ({ context }) => {
    return context.api.fetchCurrentlyReadingBooks();
  },
});
