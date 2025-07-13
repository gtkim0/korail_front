import styles from './SearchInput.module.scss';
import {forwardRef, KeyboardEvent} from "react";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

interface Props {
  onKeyDown?: (e:KeyboardEvent<HTMLInputElement>)=> void;
  baseImageUrl?: string;
  onSubmit?: () => void;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, Props>((props,ref) => {

  const {
    onKeyDown,
    baseImageUrl = '/search.svg',
    onSubmit,
    placeholder = '검색어를 입력해주세요.',
    width = 'auto',
    disabled = false
  } = props;

  return (
    <div className={styles.container} style={{ width }}>
      <input disabled={disabled} onKeyDown={(e)=> onKeyDown?.(e)} placeholder={placeholder} ref={ref}/>
      <button type={'button'} onClick={()=> onSubmit?.()} style={{background:'none'}}>
        {
          baseImageUrl &&
            <ImageWrapper width={24} height={24} src={baseImageUrl}/>
        }
      </button>
    </div>
  )
})