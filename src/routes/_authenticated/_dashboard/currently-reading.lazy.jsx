import { createLazyFileRoute } from '@tanstack/react-router';
import CurrentlyReading from '../../../pages/CurrentlyReading';

export const Route = createLazyFileRoute(
  '/_authenticated/_dashboard/currently-reading'
)({
  component: CurrentlyReading,
});
