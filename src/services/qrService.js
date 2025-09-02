import QRCode from 'qrcode';

// QR kod oluştur
export const generateQRCode = async (data, options = {}) => {
  try {
    const defaultOptions = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      ...options
    };

    const qrDataURL = await QRCode.toDataURL(JSON.stringify(data), defaultOptions);
    return qrDataURL;
  } catch (error) {
    throw new Error(`QR kod oluşturulamadı: ${error.message}`);
  }
};

// QR kod için menü verisi hazırla
export const prepareMenuDataForQR = (menu) => {
  return {
    menuId: menu.id,
    title: menu.title,
    createdAt: menu.createdAt,
    type: 'menu',
    url: `http://localhost:5001/menu/${menu.id}` // QR kod tarandığında gidilecek URL
  };
};

// QR kod URL'i oluştur
export const generateMenuQRUrl = (menuId, baseUrl = 'http://localhost:5001') => {
  return `${baseUrl}/menu/${menuId}`;
};
