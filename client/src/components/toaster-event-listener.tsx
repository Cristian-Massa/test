import { httpNotificationEmitter } from "@/core/lib/http-notification-observer";
import { validationErrorEmitter } from "@/core/lib/validation-error-observer";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";

export const ToasterEventListener = () => {
  useEffect(() => {
    const unsubscribeHttpError = httpNotificationEmitter.subscribe(
      (message, error) => {
        if (error) return toast.error(error.cause);
        return toast.success(message);
      },
    );
    const unsubscribeValidationError = validationErrorEmitter.subscribe(
      (err) => {
        console.log(err);
        toast(err.cause);
      },
    );
    return () => {
      unsubscribeHttpError();
      unsubscribeValidationError();
    };
  }, []);

  return (
    <>
      <Toaster />
    </>
  );
};
