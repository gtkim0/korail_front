
export const downloadWithProgress = async (url: string, onProgress: (percent: number)=> void) => {

  const res = await fetch('/');

  const contentLength = +res.headers.get('content-length')!;

  const reader = res.body?.getReader();
  const chunks = [];
  let receivedLength = 0;

  if(!reader) return;

  while (true) {
    const { done, value } = await reader.read();
    if(done) break;

    chunks.push(value);
    receivedLength += value.length;

    const percent = Math.floor((receivedLength / contentLength) * 100);
    onProgress(percent);
  }

  const blob = new Blob(chunks);
  const urlBlob = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = urlBlob;
  a.download = 'text.txt';
  a.click();
  URL.revokeObjectURL(urlBlob);
}