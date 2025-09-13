import { cva, type VariantProps } from "class-variance-authority";
import { toast as toastFunc, type ExternalToast } from "sonner";
import {
  X,
  Info,
  SquareX,
  AlertCircle,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "flex items-center justify-center gap-3 p-2 pl-3 bg-popover rounded-md border shadow-md [&>svg]:fill-toast [&>svg]:stroke-popover",
  {
    variants: {
      variant: {
        default: "[&>svg]:fill-toast [&>svg]:stroke-popover",
        filled:
          "bg-toast text-white border-none [&>svg]:fill-white [&>svg]:stroke-toast [&_button]:first:bg-white [&_button]:first:text-toast [&_button]:last:hover:bg-white/25",
        tonal:
          "bg-toast-tone border-toast/60 text-toast [&>svg]:stroke-toast-tone [&_button]:last:hover:bg-toast/10",
        accent: "rounded-xs border-l-3 border-l-toast",
      },
      status: {
        default: "[--toast:#4f39f6]",
        success: "[--toast:#00bc7d]",
        info: "[--toast:#2b7fff]",
        warning: "[--toast:#fe9a00]",
        error: "[--toast:#fb2c36]",
      },
    },

    defaultVariants: {
      variant: "default",
      status: "default",
    },
  }
);

const ToastIcons = (status: VariantProps<typeof toastVariants>["status"]) => {
  const icons = {
    info: <Info />,
    success: <CircleCheck />,
    warning: <TriangleAlert />,
    error: <SquareX />,
    default: <AlertCircle />,
  } as const;

  return icons[status || "default"];
};

type ToastProps = {
  id?: string | number;
  icon?: React.ReactNode;
  message: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: String;
    onClick: () => void;
  };
  className?: string;
} & VariantProps<typeof toastVariants>;

const Toast = ({
  id,
  icon,
  message,
  description,
  action,
  variant,
  status,
  className,
}: ToastProps) => {
  return (
    <div className={cn(toastVariants({ variant, status }), className)}>
      {/* ICON */}
      {icon || ToastIcons(status)}
      {/* MESSAGE */}
      <div className="flex-1">
        <div className="text-sm font-semibold">{message}</div>
        <div className="text-xs opacity-70">{description}</div>
      </div>
      {/* ACTIONS */}
      <div className="flex items-center gap-2 ml-1">
        {action && (
          <Button
            className="h-6 px-2 rounded-sm text-xs text-white bg-toast hover:bg-toast/90"
            onClick={() => {
              action.onClick();
              toastFunc.dismiss(id);
            }}
          >
            {action.label}
          </Button>
        )}
        <Button
          size="icon"
          variant="ghost"
          className="size-6 [&_svg]:opacity-35"
          onClick={() => toastFunc.dismiss(id)}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export function toast(
  message: React.ReactNode,
  options?: ExternalToast & Omit<ToastProps, "message">
) {
  const { icon, description, action, status, variant, className, ...props } =
    options ?? {};

  return toastFunc.custom(
    (id) => (
      <Toast
        id={id}
        icon={icon}
        message={message}
        description={description}
        action={action}
        variant={variant}
        status={status}
        className={className}
      />
    ),
    props
  );
}

toast["success"] = (
  message: React.ReactNode,
  options: ExternalToast & Omit<ToastProps, "message" | "status">
) => {
  return toast(message, { ...options, status: "success" });
};

toast["info"] = (
  message: React.ReactNode,
  options: ExternalToast & Omit<ToastProps, "message" | "status">
) => {
  return toast(message, { ...options, status: "info" });
};

toast["warning"] = (
  message: React.ReactNode,
  options: ExternalToast & Omit<ToastProps, "message" | "status">
) => {
  return toast(message, { ...options, status: "warning" });
};

toast["error"] = (
  message: React.ReactNode,
  options: ExternalToast & Omit<ToastProps, "message" | "status">
) => {
  return toast(message, { ...options, status: "error" });
};
