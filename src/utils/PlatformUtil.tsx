export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/android/i.test(userAgent)) return 'Android';

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) return 'iOS';

  return 'unknown';
};
