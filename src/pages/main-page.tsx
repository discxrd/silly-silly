import { Page } from "@/components/Page";
import { AnimalCard } from "@/components/AnimalCard";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getCats, likeCat, dislikeCat, type Cat } from "@/lib/api";

const MainPage = () => {
  const [cards, setCards] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        const { data } = await getCats(limit, offset);
        setCards(data || []);
        setError(null);
      } catch (error) {
        setError("Failed to fetch cats. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [offset]);

  const handleSwipeComplete = async (direction: "right" | "left") => {
    const swipedCard = cards[cards.length - 1];

    try {
      if (direction === "right") {
        await likeCat(swipedCard.id);
      } else {
        await dislikeCat(swipedCard.id);
      }
    } catch (error) {
      console.error("Failed to submit reaction", error);
    }

    setCards((prev) => prev.slice(0, prev.length - 1));

    if (cards.length === 1) {
      setOffset((prev) => prev + limit);
    }
  };

  return (
    <Page>
      <div className="relative flex flex-1 items-center justify-center">
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <AnimatePresence>
            {cards.map((card, index) => (
              <AnimalCard
                key={card.id}
                imageSrc={card.image}
                name={card.name}
                isTopCard={index === cards.length - 1}
                stackPosition={cards.length - 1 - index}
                onSwipeComplete={handleSwipeComplete}
              />
            ))}
          </AnimatePresence>
        )}

        {!loading && !error && !cards.length && (
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
