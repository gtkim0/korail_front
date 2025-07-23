export type NotificationPushColumnType = {
  id: string;
  status: string;
  channelName: string;
  channelType: string;
<<<<<<< HEAD
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
=======
  // method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  method: string,
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
  uri: string;
  date: string;
}