import Image from "next/image";

export const ImageWrapper = ({width, height, alt = 'logo', src}: { width: number, height: number ,alt?: string, src: string }) => {
  return (
    <div style={{width, height, position: 'relative'}}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}