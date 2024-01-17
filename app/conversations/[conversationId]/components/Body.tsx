"use client";

import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import useBody from "./useBody";

export interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const { messages, bottomRef } = useBody({
    initialMessages,
  });

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-12" ref={bottomRef} />
    </div>
  );
};

export default Body;
