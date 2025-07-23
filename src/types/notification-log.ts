export type NotificationLogColumnType = {
  id: string;
  reservationNm: string;
  sendTm: string;
  channelNm: string;
<<<<<<< HEAD
  notificationGrp: 'GET' | 'POST' | 'PUT' | 'DELETE',
=======
  notificationGrp: string,
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
  notificationText: string;
  status: string;
}