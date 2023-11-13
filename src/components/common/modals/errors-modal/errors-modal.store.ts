import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useErrorsStore = create<IErrorsState>()(
  devtools(
    (set) => ({
      errors: null,
      setErrors: (errors) => set({ errors }),
    }),
    {
      name: 'errors',
    },
  ),
);

export { useErrorsStore };
