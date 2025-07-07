export const MODAL_TITLE = {
  editMenu: '메뉴정보 수정(등록)'
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
    message : '해당 메뉴와 모든 하위 메뉴가 삭제됩니다. 계속 진행하시겠습니까?'
  },
  deleteMenu: {
    message : '해당 메뉴를 삭제하시겠습니까?'
  }
  // ...
} as const;

export type ModalMessageKey = keyof typeof MODAL_MESSAGES;