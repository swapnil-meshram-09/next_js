const otpDB = new Map();

export function saveOTP(phone, otp) {

  otpDB.set(phone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  });
}

export function verifyOTP(phone, inputOTP) {

  const record = otpDB.get(phone);

  if (!record) return false;

  if (Date.now() > record.expiresAt) {
    otpDB.delete(phone);
    return false;
  }

  if (record.otp !== inputOTP) return false;

  otpDB.delete(phone);

  return true;
}
