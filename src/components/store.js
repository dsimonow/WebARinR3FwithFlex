import create from "zustand";

export const useStore = create((set) => ({
  slidePosition: 0,
  increaseSlidePosition: () =>
    set((state) => ({
      //Hardcode Limit >7
      slidePosition:
        state.slidePosition === 7
          ? (state.slidePositon = 7)
          : state.slidePosition + 1
    })),
  decreaseSlidePosition: () =>
    set((state) => ({
      slidePosition:
        //Limit <0
        state.slidePosition === 0
          ? (state.slidePositon = 0)
          : state.slidePosition - 1
    })),
  resetSlidePosition: () => set({ slidePosition: 0 })
}));
