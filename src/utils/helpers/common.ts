import { SweetAlertOptions } from 'sweetalert2';

function isEmpty(obj: Array<any> | object): boolean {
  if (!obj || typeof obj !== 'object') return !obj;

  if (Array.isArray(obj)) {
    return !obj.length;
  }

  return !Object.keys(obj).length;
}

function removeUndefinedAndNull(obj: Object) {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (
      obj[key as keyof Object] !== undefined &&
      obj[key as keyof Object] !== null
    ) {
      result[key as any] = obj[key as keyof Object];
    }
  }

  return result;
}

const getSweetErrorConfig = (message: string): SweetAlertOptions => {
  return {
    icon: 'error',
    title: message,
    width: 600,
    padding: '3em',
    color: '#716add',
    backdrop: `
            rgba(0,0,123,0.4)
            url("/images/common/nyan-cat.gif")
            left top
            no-repeat
        `,
  };
};

export { removeUndefinedAndNull, isEmpty, getSweetErrorConfig };
