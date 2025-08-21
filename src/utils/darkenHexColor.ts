/**
 * HEX 색상을 약간 더 진한 색상으로 변환하는 함수
 * @param hex - 원본 색상 (예: '#009856')
 * @param alpha - 어둡게 할 비율 (0 ~ 1) 기본값은 0.1 (10%)
 * @returns 진해진 HEX 색상
 */

export const hexToRgba = (hex: string, alpha: number = 0.1) => {
    hex = hex.replace(/^#/, "");
    if (hex.lengh == 3) {
        hex.split('').map((c) => c + c).join();
    }
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    return `rgba(${r},${g},${b},${alpha})`
}