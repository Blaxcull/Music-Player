import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  uploadedCount: number;
  totalFiles: number;
}

export function UploadProgress({ uploadedCount, totalFiles }: UploadProgressProps) {
  const progress =
    totalFiles === 0 ? 0 : Math.round((uploadedCount / totalFiles) * 100);

  return <Progress value={progress} className="w-full" />;
}

