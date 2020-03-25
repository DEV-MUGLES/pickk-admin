import {useState} from 'react';

export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(v => ++v); // update the state to force render
};

export * from './Placement';
