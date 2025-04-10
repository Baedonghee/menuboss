import {
  IApi,
  IApiList,
  IPaymentCreate,
  IPaymentCreateForm,
  IPaymentInvoiceList,
  IPaymentMethodList,
  IPaymentProduct,
  IPaymentSubscriptionList,
  IPaymentUpdateForm
} from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import paymentApi from '@/api/client/payment.json';
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
      }: AxiosResponse<IApiList<IPaymentProduct[]>> = await axios.get(paymentApi.getProducts);
      setPaymentList(list);
    } catch (err) {
      throw err;
    }
  }

  async function getPaymentInvoices() {
    try {
      const {
        data: { list }
      }: AxiosResponse<IApiList<IPaymentInvoiceList[]>> = await axios.get(paymentApi.getInvoices);
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
      }: AxiosResponse<IApiList<IPaymentSubscriptionList[]>> = await axios.get(
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
      }: AxiosResponse<IApiList<IPaymentMethodList[]>> = await axios.get(
        paymentApi.getPaymentMethods
      );
      setPaymentMethods(list);
    } catch (err) {
      throw err;
    }
  }

  async function deleteSubscription(subscriptionId: string) {
    try {
      await axios.delete(paymentApi.deleteSubscriptions.replace(':id', subscriptionId));
      setPaymentSubscription(null);
    } catch (err) {
      throw err;
    }
  }

  async function createPaymentMethod(paymentMethodId: string) {
    try {
      const {
        data: { data }
      }: AxiosResponse<IApi<IPaymentMethodList>> = await axios.post(
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
            if (item.paymentMethodId === Number(paymentMethodId)) {
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
      setPaymentMethods((prev) =>
        prev.filter((item) => item.paymentMethodId !== Number(paymentMethodId))
      );
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
    reset
  };
}

export { usePaymentActions };
