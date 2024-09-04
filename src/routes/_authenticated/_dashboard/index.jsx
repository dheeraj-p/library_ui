import { createFileRoute } from '@tanstack/react-router';
import LoadingView from '../../../components/LoadingView';
import ErrorPlaceHolder from '../../../components/ErrorPlaceholder';

export const Route = createFileRoute('/_authenticated/_dashboard/')({
  pendingComponent: LoadingView,
  errorComponent: ErrorPlaceHolder,
  loader: ({ context }) => {
    return context.bookStore.loadMore();
  },
  gcTime: Infinity, // Never garbage collect the loaded cache
  shouldReload: false, //Don't reload unless explictly revalidated
});
