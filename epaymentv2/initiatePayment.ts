/**
 * Represents the request payload for initiating a payment.
 */
export interface InitiatePaymentRequest {
  /** URL where the user will be redirected after completing the transaction */
  return_url: string;

  /** The main website URL associated with the transaction */
  website_url: string;

  /** Total amount of the transaction (in Paisa) */
  amount: number;

  /** Unique identifier for the purchase order */
  purchase_order_id: string;

  /** Descriptive name of the purchase order */
  purchase_order_name: string;

  /** Customer's billing information (optional) */
  customer_info?: CustomerInfo;

  /** Detailed breakdown of the total amount (e.g., taxes, fees) (optional) */
  amount_breakdown?: AmountBreakdownItem[];

  /** Details about the products or services included in the transaction (optional) */
  product_details?: ProductDetail[];

  /** Additional merchant-specific information (optional) merchant_info?: MerchantInfo; */
  [key: `merchant_${string}`]: any;
}

/**
 * Contains customer information for billing purposes.
 */
export interface CustomerInfo {
  /** Customer's full name */
  name: string;

  /** Customer's email address */
  email: string;

  /** Customer's contact phone number */
  phone: string;
}

/**
 * Represents a single charge item within the amount breakdown.
 */
export interface AmountBreakdownItem {
  /** Description of a particular charge within the total amount */
  label: string;

  /** Amount (in Paisa) associated with the label */
  amount: number;
}

/**
 * Holds information about a product included in the transaction.
 */
export interface ProductDetail {
  /** Unique identifier for the product */
  identity: string;

  /** Name or description of the product */
  name: string;

  /** Total price for this product (including quantity) */
  total_price: number;

  /** Number of units of this product purchased */
  quantity: number;

  /** Price per single unit of this product */
  unit_price: number;
}

/**
 * Represents the successful response when initiating a payment.
 */
export interface InitiatePaymentResponse {
  /**
   * A unique request identifier provided upon success. Use this 'pidx'
   * for future references to this payment.
   */
  pidx: string;

  /** The URL to redirect the user to in order to complete the payment. */
  payment_url: string;

  /** Date and time (likely in ISO format) when the payment link expires. */
  expires_at: string;

  /** Number of seconds until the payment link expires. */
  expires_in: number;

  /** Additional merchant-specific information (optional) merchant_info?: MerchantInfo; */
  [key: `merchant_${string}`]: any;
}

/**
 * Represents an error response when initiating a payment.
 */
export interface InitiatePaymentError {
  /** The return URL that was likely invalid or problematic. */
  return_url: string[];

  /** A fixed error key indicating a validation issue. */
  error_key: "validation_error";
}

// initiatePayment({
//   merchant_asd: 1,
//   amount: 12,
//   purchase_order_id: "1",
//   return_url: "asd",
//   website_url: "sad",
//   purchase_order_name: "asd",
// })
