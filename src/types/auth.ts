export type AuthMe = {
  profile: {
      /** 사용자아이디  */
      "userId": string,
      /** 사용자명 */
      "userNm": string,
      /** 휴대폰번호 */
      "cpNo": string,
      /** 이메일주소 */
      "emlAddr": string,
      /** 가입일시 */
      "joinDt": string,
      /** 탈퇴여부 */
      "whdwlYn": "Y" | "N",
      /** 최종로그인시각 */
      "lastLgnTm": Date,
      /** 계정잠금여부 */
      "acntLockYn": "Y" | "N",
      /** 직급코드 */
      "jbgdCd": string,
      /** 부서코드 */
      "deptCd": string,
      /** 광역철도여부 */
      "wideRailYn": "Y" | "N",
      /** 포탈_사용자권한관계목록 */
      "tptlUserAuthrtrs": [
          {
              /** 권한아이디 */
              "authrtId": string,
              /** 권한명 */
              "authrtNm": string
          }
      ]
  }

}