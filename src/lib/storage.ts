export type Reaction = "like" | "dislike";

export interface AnimalReaction {
  animalId: number;
  reaction: Reaction;
}

const REACTIONS_STORAGE_KEY = "animal-reactions";

export const addReaction = (animalId: number, reaction: Reaction) => {
  const reactions = getReactions();
  const newReaction: AnimalReaction = { animalId: animalId, reaction };
  const updatedReactions = [...reactions, newReaction];
  localStorage.setItem(REACTIONS_STORAGE_KEY, JSON.stringify(updatedReactions));
};

export const getReactions = (): AnimalReaction[] => {
  const storedReactions = localStorage.getItem(REACTIONS_STORAGE_KEY);
  return storedReactions ? JSON.parse(storedReactions) : [];
};
