import {
  IApi,
  IApiList,
  IPaymentCreate,
  IPaymentCreateForm,
  IPaymentInvoiceDownload,
  IPaymentInvoiceListKo,
  IPaymentMethodListKo,
  IPaymentProduct,
  IPaymentSubscriptionListKo,
  IPaymentUpdateForm
} from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import paymentApi from '@/api/client/payment.json';
import subscriptionApi from '@/api/client/subscription.json';
import {
  paymentAtom,
  paymentInvoiceListSelector,
  paymentListSelector,
  paymentMethodListSelector,
  paymentSubscriptionLoadingSelector,
  paymentSubscriptionSelector
} from '@/state/payment';
import axios from '@/utils/client/axios';

function usePaymentActions() {
  const setPayment = useSetRecoilState(paymentAtom);
  const setPaymentList = useSetRecoilState(paymentListSelector);
  const setPaymentInvoiceList = useSetRecoilState(paymentInvoiceListSelector);
  const setPaymentSubscription = useSetRecoilState(paymentSubscriptionSelector);
  const setPaymentSubscriptionLoading = useSetRecoilState(paymentSubscriptionLoadingSelector);
  const setPaymentMethods = useSetRecoilState(paymentMethodListSelector);

  async function createPayment(formData: IPaymentCreateForm) {
    try {
      const {
        data: {
          data: { sessionId }
        }
      }: AxiosResponse<IApi<IPaymentCreate>> = await axios.post(paymentApi.createPayment, formData);
      return sessionId;
    } catch (err) {
      throw err;
    }
  }

  async function updatePayment(formData: IPaymentUpdateForm) {
    try {
      await axios.patch(paymentApi.updatePayment, formData);
    } catch (err) {
      throw err;
    }
  }

  async function getPaymentProducts() {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<IPaymentProduct[]>> = await axios.get(
        subscriptionApi.getSubscriptionProducts
      );
      setPaymentList(list);
    } catch (err) {
      throw err;
    }
  }

  async function getPaymentInvoices() {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<IPaymentInvoiceListKo[]>> = await axios.get(paymentApi.getInvoices);
      setPaymentInvoiceList(list);
    } catch (err) {
      throw err;
    }
  }

  async function getSubscription() {
    try {
      setPaymentSubscriptionLoading(true);
      const {
        data: { list }
      }: AxiosResponse<IApiList<IPaymentSubscriptionListKo[]>> = await axios.get(
        paymentApi.getSubscriptions
      );
      if (list.length) {
        setPaymentSubscription(list[0]);
      }
      setPaymentSubscriptionLoading(false);
    } catch (err) {
      throw err;
    }
  }

  async function getPaymentMethods() {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<IPaymentMethodListKo[]>> = await axios.get(
        paymentApi.getPaymentMethods
      );
      setPaymentMethods(list);
    } catch (err) {
      throw err;
    }
  }

  async function deleteSubscription(subscriptionId: string) {
    try {
      await axios.patch(paymentApi.deleteSubscriptions.replace(':id', subscriptionId));
      setPaymentSubscription(null);
    } catch (err) {
      throw err;
    }
  }

  async function createPaymentMethod(paymentMethodId: string) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IPaymentMethodListKo>> = await axios.post(
        paymentApi.createPaymentMethod.replace(':id', paymentMethodId)
      );
      setPaymentMethods((prev) => [...prev, data]);
    } catch (err) {
      throw err;
    }
  }

  async function updatePaymentMethodChange(paymentMethodId: string) {
    try {
      await axios.patch(paymentApi.updatePaymentMethodChange.replace(':id', paymentMethodId));
      setPaymentMethods((prev) => {
        if (prev.length) {
          return prev.map((item) => {
            if (item.paymentMethodId === paymentMethodId) {
              return {
                ...item,
                isDefault: true
              };
            }
            return {
              ...item,
              isDefault: false
            };
          });
        }
        return prev;
      });
    } catch (err) {
      throw err;
    }
  }

  async function deletePaymentMethod(paymentMethodId: string) {
    try {
      await axios.delete(paymentApi.deletePaymentMethod.replace(':id', paymentMethodId));
      setPaymentMethods((prev) => prev.filter((item) => item.paymentMethodId !== paymentMethodId));
    } catch (err) {
      throw err;
    }
  }

  async function postPaymentCard(formData: {
    cardNo: string;
    cardRrNo: string;
    cardExpMonth: string;
    cardExpYear: string;
    cardPassword: string;
  }) {
    try {
      await axios.post(paymentApi.postPaymentCards, formData);
    } catch (err) {
      throw err;
    }
  }

  async function updatePaymentCard(formData: {
    cardNo: string;
    cardRrNo: string;
    cardExpMonth: string;
    cardExpYear: string;
    cardPassword: string;
  }) {
    try {
      await axios.put(paymentApi.updatePaymentCards, formData);
    } catch (err) {
      throw err;
    }
  }

  async function postPaymentSubscription(formData: { productId: number; quantity: number }) {
    try {
      await axios.post(subscriptionApi.postSubscriptionPayments, formData);
    } catch (err) {
      throw err;
    }
  }

  async function updatePaymentSubscription(
    subscriptionId: number,
    formData: {
      productId: number;
      quantity: number;
    }
  ) {
    try {
      await axios.patch(
        subscriptionApi.updateSubscriptionPayments.replace(':id', subscriptionId.toString()),
        formData
      );
    } catch (err) {
      throw err;
    }
  }

  async function getInvoicesDownload(invoiceId: string) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IPaymentInvoiceDownload>> = await axios.get(
        paymentApi.getInvoicesDownload.replace(':id', invoiceId)
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function reset() {
    setPayment({
      list: [],
      loading: true,
      invoiceList: [],
      invoiceListLoading: true,
      subscriptionLoading: true,
      subscription: null,
      methodList: [],
      methodListLoading: true
    });
  }

  return {
    createPayment,
    updatePayment,
    getPaymentProducts,
    getPaymentInvoices,
    getSubscription,
    getPaymentMethods,
    deleteSubscription,
    createPaymentMethod,
    updatePaymentMethodChange,
    deletePaymentMethod,
    postPaymentCard,
    updatePaymentCard,
    postPaymentSubscription,
    updatePaymentSubscription,
    getInvoicesDownload,
    reset
  };
}

export { usePaymentActions };
