"use client";

import {useCallback, useEffect, useRef, useState} from "react";

interface Props<T> {
  url: string;
  autoConnect?: boolean;
  onMessage?: (data: T) => void;
  onError?: (e: Event) => void;
}

export function useSSE<T = any>({
                                  url,
                                  autoConnect = true,
                                  onMessage,
                                  onError,
                                }: Props<T>) {
  const [messages, setMessages] = useState<T[]>([]);
  const [connected, setConnected] = useState(false);
  const sourceRef = useRef<EventSource | null>(null);


  const disconnect = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.close();
      sourceRef.current = null;
      setConnected(false);
      console.log("SSE 연결 종료");
    }
  }, []);

  const connect = useCallback(() => {
    if (sourceRef.current) return;
    const source = new EventSource(url);

    sourceRef.current = source;

    source.onopen = () => {
      setConnected(true);
      console.log("SSE 연결됨:", url);
    };

    source.onmessage = (event) => {
      try {
        let parsed: T;
        try {
          console.log(event.data)
          parsed = JSON.parse(event.data);
          setMessages(parsed);
          onMessage && onMessage(parsed)
        } catch {
          parsed = event.data as unknown as T;
        }

      } catch (err) {
        console.error("SSE 처리 실패:", err);
      }
    };

    source.onerror = (err) => {
      // console.error("SSE 오류:", err);
      // onError && onError(err)
      // disconnect();
    };
  }, [url, disconnect]);

  // 자동 연결
  useEffect(() => {
    if (autoConnect) {
      connect()
    }
  }, [autoConnect]);

  return {messages, connected, connect, disconnect};
}