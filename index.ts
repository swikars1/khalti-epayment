import axios from "axios";
import type {
  InitiatePaymentRequest,
  InitiatePaymentResponse,
} from "./epaymentv2/initiatePayment";
import type { AllLookupResponse } from "./epaymentv2/paymentLookup";

async function awTry<T>(promise: unknown) {
  try {
    const data = await promise;
    return [data, null] as [T, never];
  } catch (err) {
    console.error(err);
    return [null, err] as [never, unknown];
  }
}

const khaltiInstanceServer = axios.create({
  baseURL: "https://a.khalti.com/api/v2",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Key f79110302bbf46828fca3a7b7514da97`, // live secret key
  },
  responseType: "json",
});

const paymentLookup = async (pidx: string) => {
  const [response, error] = await awTry<{ data: AllLookupResponse }>(
    khaltiInstanceServer.get(`/epayment/lookup?pidx=${pidx}`)
  );
  if (error) {
    console.log("Error, in lookupPayment: ", error);
  }
  return response.data;
};

const initiatePayment = async (payload: InitiatePaymentRequest) => {
  const [response, error] = await awTry<{ data: InitiatePaymentResponse }>(
    khaltiInstanceServer.post("/epayment/initiate/", payload)
  );
  if (error) {
    console.log("Error, in initiatePayment: ", error);
  }
  return response.data;
};

export const khaltiApi = {
  initiatePayment,
  paymentLookup,
};
