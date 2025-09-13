import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Toggle } from "@/components/ui/toggle";
import { Toaster } from "sonner";
import { Dice5, MessageSquareMore } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";

const variants = ["filled", "tonal", "accent", "default"] as const;
const statuses = ["success", "info", "warning", "error", "default"] as const;

function App() {
  const [currVariant, setCurrVariant] =
    useState<(typeof variants)[number]>("default");
  const [currStatus, setCurrStatus] =
    useState<(typeof statuses)[number]>("default");
  const [theme, setTheme] = useState("light");

  const showToast = () => {
    toast("Message", {
      description: "this is the description of the message",
      variant: currVariant,
      status: currStatus,
      action: {
        label: "action",
        onClick: () => {},
      },
    });
  };

  const showRandomToast = () => {
    const randVariant = variants[Math.floor(Math.random() * 3)];
    const randStatus = statuses[Math.floor(Math.random() * 4)];
    setCurrVariant(randVariant);
    setCurrStatus(randStatus);
    toast("Message", {
      description: "this is the description of the message",
      variant: randVariant,
      status: randStatus,
      action: {
        label: "action",
        onClick: () => {},
      },
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="space-y-8 border rounded-lg p-6 bg-card shadow-lg">
        {/* Heading */}
        <h3 className="font-bold text-lg">Customized Shadcn Sonner</h3>
        <div className="space-y-6">
          {/* Variants */}
          <div className="flex flex-wrap items-center gap-3">
            <h5 className="font-semibold w-16">Variant</h5>
            <div className="flex gap-2">
              {variants.map((variant) => (
                <Toggle
                  key={variant}
                  variant="outline"
                  pressed={variant === currVariant}
                  onClick={() => setCurrVariant(variant)}
                >
                  {variant}
                </Toggle>
              ))}
            </div>
          </div>
          {/* Status */}
          <div className="flex flex-wrap items-center gap-3">
            <h5 className="font-semibold w-16">Status</h5>
            <div className="flex gap-2">
              {statuses.map((status) => (
                <Toggle
                  key={status}
                  variant="outline"
                  pressed={status === currStatus}
                  onClick={() => setCurrStatus(status)}
                >
                  {status}
                </Toggle>
              ))}
            </div>
          </div>
          {/* Theme */}
          <div className="flex flex-wrap items-center gap-3">
            <h5 className="font-semibold w-16">Theme</h5>
            <div className="flex gap-2">
              <Toggle
                variant="outline"
                pressed={theme === "light"}
                onClick={() => setTheme("light")}
              >
                light
              </Toggle>
              <Toggle
                variant="outline"
                pressed={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                dark
              </Toggle>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="space-x-4">
          <Button onClick={showToast}>
            <MessageSquareMore />
            Toast
          </Button>
          <Button variant="outline" onClick={showRandomToast}>
            <Dice5 />
            Random
          </Button>
        </div>
      </div>
      <Toaster position="top-center" visibleToasts={3} />
    </div>
  );
}

export default App;
