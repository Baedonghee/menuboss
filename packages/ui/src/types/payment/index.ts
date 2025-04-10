export interface IPaymentCreate {
  sessionId: string;
}

export interface IPaymentCreateForm {
  productId: number;
  quantity: number;
  successUrl: string;
  cancelUrl: string;
}

export interface IPaymentUpdateForm {
  subscriptionId: number;
  productId: number;
  quantity: number;
}

export interface IPaymentProduct {
  productId: number;
  title: string;
  description: string;
  amount: number;
  currency: string;
  interval: string;
}

export interface IPaymentAccountPlanList {
  productId: number;
  name: string;
  yearPrice: string;
  monthPrice: string;
  perScreen: string;
  description: string;
  count: number;
  buttonName: string;
  options: string[];
  currency?: string;
  monthInterval?: string;
  yearInterval?: string;
  monthProductId?: number;
  yearProductId?: number;
}

interface IPaymentInvoiceListProduct {
  title: string; // 상품 이름
  quantity: number; // 상품 수량
}

interface IPaymentInvoiceListPayment {
  type: string; // 결제 종류
  amount: number; // 결제 금액 (USD)
  currency: string; // 결제 단위
}

export interface IPaymentInvoiceList {
  invoiceNumber: string; // 영수증 번호
  product: IPaymentInvoiceListProduct; // 상품 오브젝트
  payment: IPaymentInvoiceListPayment; // 결제 오브젝트
  pdfUrl: string; // 영수증 PDF URL
  createdDate: number; // 생성시간
}

export interface IPaymentInvoiceListKo {
  invoiceId: string; // 영수증 번호
  invoiceNumber: string;
  product: IPaymentInvoiceListProduct; // 상품 오브젝트
  payment: IPaymentInvoiceListPayment; // 결제 오브젝트
  createdDate: number; // 생성시간
}

interface IPaymentSubscriptionProduct {
  productId: number;
  amount: number;
  currency: string;
  interval: string;
  title: string;
}

interface IPaymentSubscriptionPaymentMethod {
  type: string;
  brand: string;
  last4: string;
  year: number;
  month: number;
}

interface IPaymentSubscriptionPaymentMethodKo {
  type: string;
  card: {
    object: string;
    cardNumber: string;
    cardBrand: string;
    companyName: string;
  };
  createdDate: string;
}

interface IPaymentSubscriptionInvoice {
  amount: number;
  quantity: number;
  currency: string;
  nextPaymentDate: string;
}

export interface IPaymentSubscriptionList {
  subscriptionId?: number;
  product: IPaymentSubscriptionProduct;
  paymentMethod?: IPaymentSubscriptionPaymentMethod;
  invoice?: IPaymentSubscriptionInvoice;
}

export interface IPaymentSubscriptionListKo {
  subscriptionId?: number;
  product: IPaymentSubscriptionProduct;
  paymentMethod?: IPaymentSubscriptionPaymentMethodKo;
  invoice?: IPaymentSubscriptionInvoice;
}

export interface IPaymentMethodList {
  paymentMethodId: number;
  type: string;
  card: {
    brand: string;
    last4: string;
    year: number;
    month: number;
  };
  isDefault: boolean;
  createdDate: string;
}

export interface IPaymentMethodListKo {
  paymentMethodId: string;
  type: string;
  card: {
    object: string;
    cardNumber: string;
    cardBrand: string;
    companyName: string;
  };
  createdDate: string;
}

export interface IPaymentInvoiceDownload {
  url: string;
  params: {
    mchtId: string;
    method: string;
    trdDt: string;
    trdNo: string;
  };
  method: string;
}
