import useModal from "@/shared/hooks/useModal";
import {useEffect, useState} from "react";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";

interface Props {
  value: string;
  onSelect: (key: string)=> void;
  endPoint: string;
}

export default function SearchModalTrigger ({ value , onSelect, endPoint }: Props ) {

  const { isOpen, open, close } = useModal();
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<{ key: string,label: string }[]>([]);

  useEffect(() => {
    if (!open || search.length < 2) return;

    const delay = setTimeout(async () => {
      const res = await fetch(`${endPoint}?query=${encodeURIComponent(search)}`);
      const data = await res.json();
      setOptions(data);
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [search, open]);

  return (
    <>
      <div style={{display: 'flex', alignItems: 'flex-start', gap:'.8rem', alignSelf: 'stretch'}}>
        <input style={{cursor:'pointer'}} readOnly value={value}  />
        <button onClick={open}>검색</button>
      </div>
      {isOpen && (
        <BaseModal isOpen={isOpen} onCloseAction={close}>
          asd
        </BaseModal>
        // <div>
        //   <input
        //     value={search}
        //     onChange={(e) => setSearch(e.target.value)}
        //     placeholder="검색하세요"
        //   />
        //   <ul>
        //     {options.map((opt) => (
        //       <li key={opt.key} onClick={() => {
        //         onSelect(opt.key);
        //         close()
        //       }}>
        //         {opt.label}
        //       </li>
        //     ))}
        //   </ul>
        // </div>
      )}
    </>
  )
}


