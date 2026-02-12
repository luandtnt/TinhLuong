// Generate content code
export function generateContentCode(type: string): string {
  const typePrefix: Record<string, string> = {
    VAN_BAN: 'VB',
    SACH: 'SCH',
    AUDIO: 'AUD',
    VIDEO: 'VID',
    HINH_ANH: 'IMG',
  };

  const prefix = typePrefix[type] || 'CNT';
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

  return `${prefix}-${year}${month}${day}-${random}`;
}

export function validateISBN(isbn: string): boolean {
  // Remove hyphens and spaces
  const cleaned = isbn.replace(/[-\s]/g, '');
  
  // Check ISBN-10
  if (cleaned.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(cleaned[i]);
      if (isNaN(digit)) return false;
      sum += digit * (10 - i);
    }
    const lastChar = cleaned[9];
    const checkDigit = lastChar === 'X' ? 10 : parseInt(lastChar);
    if (isNaN(checkDigit) && lastChar !== 'X') return false;
    sum += checkDigit;
    return sum % 11 === 0;
  }
  
  // Check ISBN-13
  if (cleaned.length === 13) {
    let sum = 0;
    for (let i = 0; i < 13; i++) {
      const digit = parseInt(cleaned[i]);
      if (isNaN(digit)) return false;
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }
    return sum % 10 === 0;
  }
  
  return false;
}
