import LoadingLine from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="min-h-[90vh]  flex items-center justify-center">
      <LoadingLine />
    </div>
  );
}
