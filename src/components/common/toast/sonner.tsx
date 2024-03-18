'use client';

import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerToaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      richColors
      theme={'light'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

const ShowSonnerToaster = ({ data }: { data: any }) => {
  if (!data?.data && data?.message) {
    toast.error(data.message, {
      position: 'top-right',
      closeButton: true,
    });
  }

  if (data?.data && data?.message) {
    toast.success(data.message, {
      position: 'top-right',
      closeButton: true,
    });
  }
  return null;
};

export { ShowSonnerToaster };

export default SonnerToaster;
