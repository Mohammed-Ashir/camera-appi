import {create} from 'zustand';

const useStore = create(set => ({
  savedMedia: [],
  searchResults: [],
  addMedia: media => set(state => ({savedMedia: [...state.savedMedia, media]})),
  setSearchResults: results => set({searchResults: results}),
}));

export default useStore;
