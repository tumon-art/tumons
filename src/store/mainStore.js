import create from "zustand";

const useStore = create((set) => ({
  sidebar: false,
  sidebarSwitch: () => set((state) => ({ sidebar: !state.sidebar })),

  setSidebar: (payload) => set((state) => ({ sidebar: payload })),

  whiceCat: "Home",
  setWhiceCat: (payload) => set((state) => ({ whiceCat: payload })),
}));

export default useStore;
