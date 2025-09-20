import { create } from "zustand";

interface SearchState {
  query: string;
  results: string[];
  setQuery: (q: string) => void;
  setResults: (r: string[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  results: [],
  setQuery: (q) => set({ query: q }),
  setResults: (r) => set({ results: r }),
}));
