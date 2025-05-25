import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUserSession = async (email: string, token: string) => {
  await EncryptedStorage.setItem('email', email);
  await EncryptedStorage.setItem('accessToken', token);
};

export const clearSession = async () => {
  await EncryptedStorage.clear();
};

export const getSession = async () => {
  const email = await EncryptedStorage.getItem('email');
  const accessToken = await EncryptedStorage.getItem('accessToken');
  return { email, accessToken };
};
