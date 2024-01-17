import { useMemo, useState } from "react";
import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";
import { Conversation, User } from "@prisma/client";

const useHeader = ({
  conversation,
}: {
  conversation: Conversation & {
    users: User[];
  };
}) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);
  return {
    setDrawerOpen,
    drawerOpen,
    otherUser,
    statusText,
  };
};

export default useHeader;
