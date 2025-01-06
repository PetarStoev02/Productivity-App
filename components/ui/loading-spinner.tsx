export function LoadingSpinner({ size = "default" }: { size?: "default" | "sm" | "lg" }) {
  const sizeClasses = {
    default: "w-6 h-6",
    sm: "w-4 h-4",
    lg: "w-8 h-8"
  };

  return (
    <div className="flex justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}
      />
    </div>
  );
} 