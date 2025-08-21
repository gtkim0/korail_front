import {useEffect} from "react";

type Props = {
  ref: HTMLElement,
  setOpen: (flag: boolean) => void;
}

export const useOutsideClick = ({ref, setOpen}: Props) => {

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);
}