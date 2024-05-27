import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCureentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // CHEK IF CURRENT USER IS BLOCKED
    if (currentUser && user) {
      if (user.blocked.includes(currentUser.id)) {
        //SOME ERROR IN THIS FIND
        return set({
          chatId,
          user: null,
          isCurrentUserBlocked: true,
          isReceiverBlocked: false,
        });
      }

      // CHEK IF RECEIVER USER IS BLOCKE
      if (currentUser.blocked.includes(user.id)) {
        return set({
          chatId,
          user: user,
          isCurrentUserBlocked: false,
          isReceiverBlocked: true,
        });
      }
    }
    return set({
      chatId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  changeBlock: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
