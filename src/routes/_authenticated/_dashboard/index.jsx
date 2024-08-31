import { createFileRoute } from '@tanstack/react-router';
import LoadingView from '../../../components/LoadingView';
import ErrorPlaceHolder from '../../../components/ErrorPlaceholder';

export const Route = createFileRoute('/_authenticated/_dashboard/')({
  pendingComponent: LoadingView,
  errorComponent: ErrorPlaceHolder,
  loader: ({ context }) => {
    return context.api.getAllBooks();
  },
});
