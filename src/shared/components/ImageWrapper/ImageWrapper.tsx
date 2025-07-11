import Image from "next/image";

export const ImageWrapper =
  ({width, height, alt = 'logo', src, enableCursor = true}:
   { width: number, height: number ,alt?: string, src: string,enableCursor?: boolean }) => {
  return (
    <div style={{width, height, position: 'relative', cursor: enableCursor ? 'pointer' : 'default'}}>
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