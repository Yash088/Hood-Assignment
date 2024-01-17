"use client";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import { find } from "lodash";
import { BodyProps } from "./Body";
import { FullMessageType } from "@/app/types";
import { API_ROUTES } from "@/app/Routes/apiRoutes";
import { axiosInstance } from "@/app/utils/configureAxios";

const useBody = ({ initialMessages }: BodyProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();
  
  useEffect(() => {
    axiosInstance.post(API_ROUTES.MARK_CHAT_SEEN.replace(':conversationId',conversationId));
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axiosInstance.post(API_ROUTES.MARK_CHAT_SEEN.replace(':conversationId',conversationId));

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);
  return { messages, bottomRef };
};

export default useBody;
