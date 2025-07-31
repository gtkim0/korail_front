import styles from './SearchInput.module.scss';
import {CSSProperties, forwardRef, KeyboardEvent} from "react";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

// import SearchSvg from "@/shared/assets/images/search.svg";

interface Props {
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    baseImageUrl?: string;
    onSubmit?: () => void;
    placeholder?: string;
    width?: string;
    disabled?: boolean;
    parentClass?: string;
    inputClass?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {

    const {
        onKeyDown,
        baseImageUrl,
        onSubmit,
        placeholder = '검색어를 입력해주세요.',
        width = 'auto',
        disabled = false,
        parentClass = "",
        inputClass = ""
    } = props;

    return (
        <div className={`${styles.container} ${parentClass}`}
             style={{width, background: disabled ? '#EBEBEB' : '#fff'}}>
            <input style={{flex: 1, height: '100%', pointerEvents: disabled ? 'none' : 'auto'}}
                   disabled={disabled}
                   onKeyDown={(e) => onKeyDown?.(e)} placeholder={placeholder} ref={ref} className={inputClass}/>
            <button type={'button'} onClick={() => onSubmit?.()}
                    style={{background: 'none', pointerEvents: disabled ? 'none' : 'auto'}}>
                {
                    baseImageUrl ?
                        <ImageWrapper width={24} height={24} src={baseImageUrl}/> :
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M16.318 17.4489C14.8468 18.6678 12.9582 19.4004 10.8984 19.4004C6.20402 19.4004 2.39844 15.5948 2.39844 10.9004C2.39844 6.20597 6.20402 2.40039 10.8984 2.40039C15.5929 2.40039 19.3984 6.20597 19.3984 10.9004C19.3984 12.9589 18.6667 14.8465 17.4491 16.3173L20.7662 19.6343C21.0786 19.9468 21.0786 20.4533 20.7662 20.7657C20.4538 21.0781 19.9473 21.0781 19.6348 20.7657L16.318 17.4489ZM3.99844 10.9004C3.99844 7.08963 7.08767 4.00039 10.8984 4.00039C14.7092 4.00039 17.7984 7.08963 17.7984 10.9004C17.7984 12.7135 17.0991 14.3632 15.9555 15.5947C15.8799 15.6322 15.809 15.6825 15.746 15.7455C15.6829 15.8086 15.6326 15.8796 15.595 15.9554C14.3633 17.1002 12.7126 17.8004 10.8984 17.8004C7.08767 17.8004 3.99844 14.7112 3.99844 10.9004Z"
                                  fill="#363D44"/>
                        </svg>

                }
            </button>
        </div>
    )
})