
export type Reaction = 'like' | 'dislike';

export interface CatReaction {
  catId: number;
  reaction: Reaction;
}

const REACTIONS_STORAGE_KEY = 'cat-reactions';

export const addReaction = (catId: number, reaction: Reaction) => {
  const reactions = getReactions();
  const newReaction: CatReaction = { catId, reaction };
  const updatedReactions = [...reactions, newReaction];
  localStorage.setItem(REACTIONS_STORAGE_KEY, JSON.stringify(updatedReactions));
};

export const getReactions = (): CatReaction[] => {
  const storedReactions = localStorage.getItem(REACTIONS_STORAGE_KEY);
  return storedReactions ? JSON.parse(storedReactions) : [];
};
