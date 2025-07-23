export type NotificationPushColumnType = {
  id: string;
  status: string;
  channelName: string;
  channelType: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  uri: string;
  date: string;
}