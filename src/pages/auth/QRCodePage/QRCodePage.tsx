import { getMobileOperatingSystem } from '@util/PlatformUtil';
import { useEffect } from 'react';

export const QRCodePage = () => {
  const QR_CODE = 'm_92';
  // EFFECT
  useEffect(() => {
    const os = getMobileOperatingSystem();
    if (os === 'Android') {
      // window.location.href = `intent://career-app-fe-admin.vercel.app?qr-code=${QR_CODE}#Intent;scheme=https;package=com.capsulekaiba.pickleduels;end;`;
      window.location.href = `intent://career-app-fe-admin.vercel.app?qr-code=${QR_CODE}#Intent;scheme=https;package=com.capsulekaiba.pickleduels;end;`;
    } else if (os === 'iOS') {
      console.log('IOS');
    } else {
      window.location.href = 'https://www.capsulekaiba.com/about-us';
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
      }}
    >
      <h2>Loading ...</h2>
    </div>
  );
};
