export const MODAL_TITLE = {
  editMenu: '메뉴정보 등록/수정',
  CongestionAddAndEdit: '혼잡도 단계 등록/수정',
  Banner: '배너 정보 등록/수정',
  RouteMap: '노선정보 등록/수정'
}

export const MODAL_MESSAGES = {
  confirmDeleteUser: {
    title: '정말 탈퇴하시겠습니까?',
    message: '탈퇴하면 계정이 완전히 삭제됩니다.',
  },
  confirmLogout: {
    title: '로그아웃 하시겠습니까?',
    message: '로그아웃하면 다시 로그인해야 합니다.',
  },
  saveSuccess: {
    title: '저장 완료',
    message: '변경 사항이 저장되었습니다.',
  },

  deleteMenuWithChildren: {
    title: '메뉴 삭제',
    message: (
      <>
        선택한 메뉴를 삭제하시겠습니까?
        <br/>
        선택한 메뉴의 하위 뎁스가 같이 삭제됩니다.
      </>
    ),
  },
  deleteMenu: {
    message: '해당 메뉴를 삭제하시겠습니까?'
  }
  // ...
} as const;

export type ModalMessageKey = keyof typeof MODAL_MESSAGES;