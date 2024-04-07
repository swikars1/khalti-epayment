import axios, { AxiosInstance } from "axios";
import type {
  InitiatePaymentRequest,
  InitiatePaymentResponse,
} from "./epaymentv2/initiatePayment";
import type {
  AllLookupResponse,
  PaymentLookupRequest,
} from "./epaymentv2/paymentLookup";

async function awTry<T>(promise: unknown) {
  try {
    const data = await promise;
    return [data, null] as [T, never];
  } catch (err) {
    console.error(err);
    return [null, err] as [never, unknown];
  }
}

const paymentLookup = (instance: AxiosInstance) => {
  return async ({ pidx }: PaymentLookupRequest) => {
    const [response, error] = await awTry<{ data: AllLookupResponse }>(
      instance.get(`/epayment/lookup?pidx=${pidx}`)
    );
    if (error) {
      console.log("Error, in lookupPayment: ", error);
    }
    return response.data;
  };
};

const initiatePayment = (instance: AxiosInstance) => {
  return async (payload: InitiatePaymentRequest) => {
    const [response, error] = await awTry<{ data: InitiatePaymentResponse }>(
      instance.post("/epayment/initiate/", payload)
    );

    if (error) {
      console.log("Error, in initiatePayment: ", error);
    }
    return response.data;
  };
};

export const createKhaltiInstance = ({
  env,
  secretKey,
}: {
  env: "sandbox" | "production";
  secretKey: string;
}) => {
  const urls = {
    sandbox: "https://a.khalti.com/api/v2",
    production: "https://khalti.com/api/v2",
  };
  const instance = axios.create({
    baseURL: urls[env],
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${secretKey}`, // live secret key
    },
    responseType: "json",
  });

  return {
    paymentLookup: paymentLookup(instance),
    initiatePayment: initiatePayment(instance),
  };
};

// const ins = createKhaltiInstance({
//   env: "sandbox",
//   secretKey: "Asd",
// });

// async function a() {
//   const { payment_url, pidx } = await ins.initiatePayment({
//     return_url: "https://example.com/payment/",
//     website_url: "https://example.com/",
//     amount: 1300,
//     purchase_order_id: "test12",
//     purchase_order_name: "test",
//     customer_info: {
//       name: "Khalti Bahadur",
//       email: "example@gmail.com",
//       phone: "9800000123",
//     },
//     amount_breakdown: [
//       {
//         label: "Mark Price",
//         amount: 1000,
//       },
//       {
//         label: "VAT",
//         amount: 300,
//       },
//     ],
//     product_details: [
//       {
//         identity: "1234567890",
//         name: "Khalti logo",
//         total_price: 1300,
//         quantity: 1,
//         unit_price: 1300,
//       },
//     ],
//     merchant_username: "merchant_name",
//     merchant_extra: "merchant_extra",
//   });

//   const ff = await ins.paymentLookup({
//     pidx,
//   });

//   if (ff.status === "Completed") {
//     console.log("Payment Success");
//   }

//   console.log({ payment_url, pidx });
// }
