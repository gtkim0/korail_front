interface Props {
  height?: string;
  background?: string;
}

export default function Divider({height = '.8rem', background = '#d5d5d6'}: Props) {
  return (
    <div style={{height, background, width: '1px'}}/>
  )
}