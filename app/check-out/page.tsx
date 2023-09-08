'use client';

import CardWithForm from '@/components/Checkout';
import ReactQueryHelper from '@/utils/react-query';

export default function CheckOut() {
  return (
    <ReactQueryHelper>
      <CardWithForm />
    </ReactQueryHelper>
  );
}
