import { usePaystackPayment } from 'react-paystack';

type Config = {
  email: string;
  amount: number;
  phone: string;
  firstname: string;
  lastname: string;
};
export const usePaystackHook = ({ config }: { config: Config }) => {
  return usePaystackPayment({
    reference: new Date().getTime().toString(),

    email: config.email,
    amount: config.amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_37335d37c9fb118d8a917de0a58a8efde1bb96c4',
    phone: config.phone,
    firstname: config.firstname,
    lastname: config.lastname,
  });
};
