import { messages } from '@constants';

export async function handleErrors<T>(tryBlock: () => Promise<T>): Promise<T | string> {
  try {
    return await tryBlock();
  } catch (error) {
    return messages.errors.unknownErr;
  }
}