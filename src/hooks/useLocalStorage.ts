/* eslint-disable no-console */
import { useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' && window.localStorage.getItem(key);
      return item || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: (arg0: any) => any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
