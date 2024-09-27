import { Loader2 } from "lucide-react";

interface OverlayLoaderProps {
  isLoading: boolean;
  text?: string;
}

export default function OverlayLoader({
  isLoading,
  text = "Loading...",
}: OverlayLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
