import {
  IPaymentInvoiceListKo,
  IPaymentMethodListKo,
  IPaymentProduct,
  IPaymentSubscriptionListKo
} from '@repo/ui/types';
import { atom, DefaultValue, selector } from 'recoil';

interface IPaymentState {
  list: IPaymentProduct[];
  loading: boolean;
  invoiceList: IPaymentInvoiceListKo[];
  invoiceListLoading: boolean;
  subscriptionLoading: boolean;
  subscription: IPaymentSubscriptionListKo | null;
  methodList: IPaymentMethodListKo[];
  methodListLoading: boolean;
}

const paymentAtom = atom<IPaymentState>({
  key: 'paymentAtom',
  default: {
    list: [],
    loading: true,
    invoiceList: [],
    invoiceListLoading: true,
    subscriptionLoading: true,
    subscription: null,
    methodList: [],
    methodListLoading: true
  }
});

const paymentListSelector = selector<IPaymentProduct[]>({
  key: 'paymentListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(paymentAtom, (prevState) => ({
      ...prevState,
      list: newValue,
      listLoading: false
    }));
  },
  get: ({ get }) => {
    const { list } = get(paymentAtom);
    return list;
  }
});

const paymentInvoiceListSelector = selector<IPaymentInvoiceListKo[]>({
  key: 'paymentInvoiceListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(paymentAtom, (prevState) => ({
      ...prevState,
      invoiceList: newValue,
      invoiceListLoading: false
    }));
  },
  get: ({ get }) => {
    const { invoiceList } = get(paymentAtom);
    return invoiceList;
  }
});

const paymentSubscriptionLoadingSelector = selector<boolean>({
  key: 'paymentSubscriptionLoadingSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(paymentAtom, (prevState) => ({
      ...prevState,
      subscriptionLoading: newValue
    }));
  },
  get: ({ get }) => {
    const { subscriptionLoading } = get(paymentAtom);
    return subscriptionLoading;
  }
});

const paymentSubscriptionSelector = selector<IPaymentSubscriptionListKo | null>({
  key: 'paymentSubscriptionSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(paymentAtom, (prevState) => ({
      ...prevState,
      subscription: newValue
    }));
  },
  get: ({ get }) => {
    const { subscription } = get(paymentAtom);
    return subscription;
  }
});

const paymentInvoiceListLoadingSelector = selector<boolean>({
  key: 'paymentInvoiceListLoadingSelector',
  get: ({ get }) => {
    const { invoiceListLoading } = get(paymentAtom);
    return invoiceListLoading;
  }
});

const paymentMethodListSelector = selector<IPaymentMethodListKo[]>({
  key: 'paymentMethodListSelector',
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }
    set(paymentAtom, (prevState) => ({
      ...prevState,
      methodList: newValue,
      methodListLoading: false
    }));
  },
  get: ({ get }) => {
    const { methodList } = get(paymentAtom);
    return methodList;
  }
});

const paymentMethodListLoadingSelector = selector<boolean>({
  key: 'paymentMethodListLoadingSelector',
  get: ({ get }) => {
    const { methodListLoading } = get(paymentAtom);
    return methodListLoading;
  }
});

export {
  paymentAtom,
  paymentListSelector,
  paymentSubscriptionLoadingSelector,
  paymentSubscriptionSelector,
  paymentInvoiceListSelector,
  paymentInvoiceListLoadingSelector,
  paymentMethodListSelector,
  paymentMethodListLoadingSelector
};
