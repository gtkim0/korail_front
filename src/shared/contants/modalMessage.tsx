import {PageType} from "@/shared/enum/PageType";

export const MODAL_TITLE: Partial<Record<PageType, string>> = {
  [PageType.Menu]: '메뉴정보 등록/수정',
  [PageType.CongestionStep]: '혼잡도 단계 등록/수정',
  [PageType.Banner]: '배너 정보 등록/수정',
  [PageType.RouteMap]: '노선정보 등록/수정',
  [PageType.OperationInfo]: '운행정보 등록/수정',
  [PageType.BatchCycle]: 'DB 업데이트 주기 등록/수정',
  [PageType.ProgrammingInfo]: '편성정보 등록/수정',
  [PageType.StationInfo]: '역사정보 등록/수정',
  [PageType.CarriageInfo]: '차량정보 등록/수정',
  [PageType.EvacuationInfo]: '대피안내정보 등록/수정',
  [PageType.ZoneInfo]: '구역 정보 등록/수정',
  [PageType.SpecialPeriod]: '특수기간정보 등록/수정',
  [PageType.Instrumentation]: '계측장치정보 등록/수정',
  [PageType.SaveConditionImage]: '조건영상저장 등록/수정',
  [PageType.EmergencyManual]: '비상 대응 메뉴얼 등록/수정',
  [PageType.EmergencyActionManual]: '현장 조치 메뉴얼 등록/수정',
  [PageType.EmergencyFieldPersonnel]: '현장인원 등록/수정',
  [PageType.EmergencyGuideInfo]: '안내방송 정보 등록/수정',
  [PageType.EmergencyBroadcastControl]: '자동수동 방송 등록/수정',
  [PageType.NotificationRule]: '알림규칙 등록/수정',
  [PageType.NotificationPush]: '푸시알림 등록/수정',
  [PageType.NotificationLog]: '알림 등록/수정',
  [PageType.NotificationText]: '알림문구 등록/수정',
  [PageType.NotificationRecipient]: '알림 수신문자 등록/수정',
  [PageType.CongestionVerificationTarget]: '대피안내도',
  [PageType.PermissionGroup]: '권한그룹 등록/수정',
  [PageType.PermissionUser]: '사용자별 권한 등록/수정',
  [PageType.PermissionMenu]: '메뉴별 권한 등록/수정'
}

export const MODAL_MESSAGES = {

  sendEmail: {
    title: '이용안내',
    message: '회원가입시 등록된 이메일 주소로 정보를 발송하였습니다.'
  },

  successSignup: {
    title: '확인',
    message: (
      <>
        회원가입이 완료 되었습니다.<br/>
        [확인]버튼을 누르면 회원로그인 페이지로 이동합니다.
      </>
    )
  },

  showVerificationSentModal: {
    title: '확인',
    message: (
      <>
        입력하신 이메일 주소로 인증메일이 발송 되었습니다.
        <br/>
        <br/>
        이메일 확인 후 내용에 기입된 인증번호를
        <br/>
        아래 인증번호 입력란에 입력후 회원가입을 계속 진행하세요.
      </>
    )
  },

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
  },

  deleteContent: {
    message: '선택된 항목을 삭제하시겠습니까?'
  }

  // ...
} as const;

export type ModalMessageKey = keyof typeof MODAL_MESSAGES;