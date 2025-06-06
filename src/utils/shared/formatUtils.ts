export function formatTime(seconds: number): string {
  // Format seconds into a human-readable string
  if (seconds < 60) {
    return seconds.toString();
  }

  // Convert seconds to minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
