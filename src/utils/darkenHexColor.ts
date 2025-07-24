/**
 * HEX 색상을 약간 더 진한 색상으로 변환하는 함수
 * @param hex - 원본 색상 (예: '#009856')
 * @param factor - 어둡게 할 비율 (0 ~ 1) 기본값은 0.1 (10%)
 * @returns 진해진 HEX 색상
 */
function darkenHexColor(hex: string, factor: number = 0.1): string {

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  if (hex.length !== 6) throw new Error('잘못된 HEX 코드입니다.');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const darken = (c: number) =>
    Math.max(0, Math.min(255, Math.floor(c * (1 - factor))));

  const newR = darken(r).toString(16).padStart(2, '0');
  const newG = darken(g).toString(16).padStart(2, '0');
  const newB = darken(b).toString(16).padStart(2, '0');

  return `#${newR}${newG}${newB}`;
}