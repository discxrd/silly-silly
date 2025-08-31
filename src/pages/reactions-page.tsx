import { Page } from "@/components/Page";
import { getReactions, type AnimalReaction } from "@/lib/storage";
import { useEffect, useState } from "react";

const ReactionsPage = () => {
  const [reactions, setReactions] = useState<AnimalReaction[]>([]);

  useEffect(() => {
    setReactions(getReactions());
  }, []);

  const handleClearReactions = () => {
    localStorage.removeItem("animal-reactions");
    setReactions([]);
  };

  return (
    <Page>
      <div className="text-white">
        <h1 className="text-2xl mb-4">Reactions</h1>
        <button
          onClick={handleClearReactions}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Clear Reactions
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reactions.map((reaction, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <p>Animal ID: {reaction.animalId}</p>
              <p>Reaction: {reaction.reaction}</p>
            </div>
          ))}
        </div>
        {reactions.length === 0 && <p>No reactions yet.</p>}
      </div>
    </Page>
  );
};

export default ReactionsPage;
