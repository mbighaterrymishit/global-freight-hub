import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/15550100199"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="h-13 w-13 rounded-full bg-[#25D366] hover:scale-110 transition-transform shadow-elegant flex items-center justify-center text-white"
        style={{ height: 52, width: 52 }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={cn(
          "h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-elegant flex items-center justify-center transition-all",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
