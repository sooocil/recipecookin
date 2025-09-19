import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavouritesState {
  favourites: string[];
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
  clearFavourites: () => void;
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],
      addFavourite: (id) =>
        set((state) => {
          if (state.favourites.includes(id)) {
            return state;
          }
          return { favourites: [...state.favourites, id] };
        }),
      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((recipeId) => recipeId !== id),
        })),
      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: "favourites-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);