import { useState } from 'react';

interface Props {
  storageKey: string;
  defaultExpandAll: boolean;
  id: string;
}

export default function useExpand (props: Props) {

  const { storageKey, defaultExpandAll, id } = props;

  const [ isOpen, setIsOpen ] = useState(defaultExpandAll);

  const toggle = () => {

    const saved = localStorage.getItem(storageKey);
    let openIds: string[] = saved ? JSON.parse(saved) : [];

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      if(!openIds.includes(id)) openIds.push(id)
    } else {
      openIds = openIds.filter(clickId=> clickId !== id);
    }

    localStorage.setItem(storageKey, JSON.stringify(openIds))
  }

  const loadItem = () => {
    const saved = localStorage.getItem(storageKey);

    if( saved ) {
      const openIds = JSON.parse(saved);
      setIsOpen(openIds.includes(id))
    } else {
      setIsOpen(defaultExpandAll);
    }
  }

  const open = () => {
    setIsOpen(true);

    const saved = localStorage.getItem(storageKey);
    let openIds: string[] = saved ? JSON.parse(saved) : [];

    if (!openIds.includes(id)) {
      openIds.push(id);
      localStorage.setItem(storageKey, JSON.stringify(openIds));
    }
  }

  return { isOpen, toggle, open, loadItem }
}