export type NotificationLogColumnType = {
  id: string;
  reservationNm: string;
  sendTm: string;
  channelNm: string;
  notificationGrp: 'GET' | 'POST' | 'PUT' | 'DELETE',
  notificationText: string;
  status: string;
}