interface PaymentResponse {
  success: boolean;
  error_msg?: string;
  merchant_uid?: string;
}

interface PaymentData {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: string;
  m_redirect_url: string;
}

interface IMPType {
  init: (impId: string) => void;
  request_pay: (data: PaymentData, callback: (response: PaymentResponse) => void) => void;
}

export type { PaymentData, PaymentResponse, IMPType }