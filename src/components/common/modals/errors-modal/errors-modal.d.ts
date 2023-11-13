/* eslint-disable no-unused-vars */
type SetErrorsStoreParams = {
  message: string;
  description: string;
};

interface IErrorsState {
  errors: null | SetErrorsStoreParams;
  setErrors: (errors: SetErrorsStoreParams | null) => void;
}
