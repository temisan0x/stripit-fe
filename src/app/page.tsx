import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { StripItApp } from "../components/StripItApp";
export default function Home() {
  return (
    <ErrorBoundary>
      <StripItApp />
    </ErrorBoundary>
  );
}