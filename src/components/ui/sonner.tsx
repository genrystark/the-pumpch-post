import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster toaster-win95"
      closeButton
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: "win95-toast",
          title: "win95-toast-title",
          description: "win95-toast-description",
          actionButton: "win95-toast-btn",
          cancelButton: "win95-toast-btn",
          closeButton: "win95-toast-close",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
