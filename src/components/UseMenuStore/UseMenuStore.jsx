import { create } from 'zustand';

export const useMenuStore = create((set) => ({
  womenMenuOpen: false,
  menMenuOpen: false,
  storeMenuOpen: false,
  aboutMenuOpen: false,
  toggleWomenMenu: () => set((state) => ({ womenMenuOpen: !state.womenMenuOpen })),
  toggleMenMenu: () => set((state) => ({ menMenuOpen: !state.menMenuOpen })),
  toggleStoreMenu: () => set((state) => ({ storeMenuOpen: !state.storeMenuOpen })),
  toggleAboutMenu: () => set((state) => ({ aboutMenuOpen: !state.aboutMenuOpen })),
}));












// import {create} from 'zustand';

// const useMenuMenStore = create((set) => ({
//   isOpen: false,
//   toggleMenuMen: () => set((state) => ({ isOpen: !state.isOpen })),
// }));

// const useMenuWomenStore = create((set) => ({
//   isOpen: false,
//   toggleMenuWomen: () => set((state) => ({ isOpen: !state.isOpen })),
// }));

// const useMenuStoreStore = create((set) => ({
//   isOpen: false,
//   toggleMenuStore: () => set((state) => ({ isOpen: !state.isOpen })),
// }));

// const useMenuAboutStore = create((set) => ({
//   isOpen: false,
//   toggleMenuAbout: () => set((state) => ({ isOpen: !state.isOpen })),
// }));

// export {useMenuMenStore, useMenuWomenStore, useMenuStoreStore, useMenuAboutStore};
