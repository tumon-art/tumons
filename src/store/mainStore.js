import create from "zustand";

const useStore = create((set) => ({
  sidebar: false,
  sidebarSwitch: () => set((state) => ({ sidebar: !state.sidebar })),

  whiceCat: "Home",
  setWhiceCat: (payload) => set((state) => ({ whiceCat: payload })),
}));

export default useStore;
