import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute(
  '/_authenticated/_dashboard/request-new'
)({
  component: () => {
    return <div>Request New</div>;
  },
});
