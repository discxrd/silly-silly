import { Page } from "@/components/Page";
import { AnimalCard } from "@/components/AnimalCard";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { addReaction } from "@/lib/storage";

// placeholders
const initialCards = [
  { id: 3, src: "/placeholder/kity3.png", name: "Cat" },
  { id: 2, src: "/placeholder/kity2.png", name: "Cat" },
  { id: 1, src: "/placeholder/kity.png", name: "Cat" },
];

const MainPage = () => {
  const [cards, setCards] = useState(initialCards);

  const handleSwipeComplete = (direction: "right" | "left") => {
    const swipedCard = cards[cards.length - 1];

    if (direction === "right") {
      addReaction(swipedCard.id, 'like');
    } else {
      addReaction(swipedCard.id, 'dislike');
    }

    setCards((prev) => prev.slice(0, prev.length - 1));
  };

  return (
    <Page>
      <div className="relative flex flex-1 items-center justify-center">
        <AnimatePresence>
          {cards.map((card, index) => (
            <AnimalCard
              key={card.id}
              imageSrc={card.src}
              name={card.name}
              isTopCard={index === cards.length - 1}
              stackPosition={cards.length - 1 - index}
              onSwipeComplete={handleSwipeComplete}
            />
          ))}
        </AnimatePresence>

        {!cards.length && (
          <motion.div
            className="text-white text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No more cards!
          </motion.div>
        )}
      </div>
    </Page>
  );
};

export default MainPage;
