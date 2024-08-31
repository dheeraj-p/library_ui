import { createLazyFileRoute } from '@tanstack/react-router';
import QRCodes from '../../../pages/admin/QRCodes';

export const Route = createLazyFileRoute('/_authenticated/admin/qr-codes')({
  component: () => <QRCodes />,
});
