/**
 * Represents the data received in the redirect callback URL after a payment attempt.
 */
export interface PaymentRedirectResponse {
  /** The initial payment identifier provided during initiation. */
  pidx: string;

  /**
   * The current status of the transaction.
   * - "Completed": Payment completed successfully.
   * - "Pending": Payment in progress. Use the Lookup API for final confirmation.
   * - "UserCanceled": The user canceled the payment process.
   */
  status: "Completed" | "Pending" | "UserCanceled";

  /** The unique transaction identifier assigned by Khalti. */
  transaction_id: string;

  /** (Synonym for transaction_id) - The unique transaction identifier assigned by Khalti.  */
  tidx: string;

  /** The total amount paid by the user (in Paisa). */
  amount: number;

  /** The payer's Khalti ID. */
  mobile: string;

  /** The unique purchase order ID provided when initiating the payment. */
  purchase_order_id: string;

  /** The name associated with the purchase order. */
  purchase_order_name: string;

  /** (Synonym for amount) - The total amount paid by the user (in Paisa). */
  total_amount: number;
}

// It's recommended that during implementation, payment lookup API is checked for confirmation after the redirect callback is received

// Success transaction callback

// http://example.com/?pidx=bZQLD9wRVWo4CdESSfuSsB
// &txnId=4H7AhoXDJWg5WjrcPT9ixW
// &amount=1000
// &total_amount=1000
// &status=Completed
// &mobile=98XXXXX904
// &tidx=4H7AhoXDJWg5WjrcPT9ixW
// &purchase_order_id=test12
// &purchase_order_name=test
// &transaction_id=4H7AhoXDJWg5WjrcPT9ixW

// Canceled transaction callback

// http://example.com/?pidx=bZQLD9wRVWo4CdESSfuSsB
// &transaction_id=
// &tidx=
// &amount=1000
// &total_amount=1000
// &mobile=
// &status=User canceled
// &purchase_order_id=test12
// &purchase_order_name=test
