import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  type PanInfo,
} from "motion/react";
import { useEffect } from "react";

interface Props {
  imageSrc: string;
  name: string;
  isTopCard: boolean;
  stackPosition: number;
  onSwipeComplete: (direction: "right" | "left") => void;
}

export const AnimalCard = ({
  imageSrc,
  name,
  isTopCard,
  stackPosition,
  onSwipeComplete,
}: Props) => {
  const x = useMotionValue(0);
  const controls = useAnimation();

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const scale = useTransform(x, [-150, 150], [1, 0.95], { clamp: false });
  const y = useTransform(x, [-150, 150], [0, -40]);
  const likeOpacity = useTransform(x, [30, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, -30], [1, 0]);

  useEffect(() => {
    if (isTopCard) {
      controls.start({ scale: 1, y: 0 });
    }
  }, [isTopCard, controls]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 100;
    const swipeVelocityThreshold = 500;
    const isLiked =
      info.offset.x > swipeThreshold ||
      info.velocity.x > swipeVelocityThreshold;
    const isDisliked =
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -swipeVelocityThreshold;

    if (isLiked || isDisliked) {
      const direction = isLiked ? "right" : "left";
      const flyDirection = isLiked ? 1 : -1;
      controls
        .start({
          x: flyDirection * (window.innerWidth / 2 + 200),
          opacity: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        })
        .then(() => onSwipeComplete(direction));
    } else {
      controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      });
    }
  };

  return (
    <motion.div
      className="absolute w-[400px] h-[800px] cursor-grab rounded-2xl shadow-xl"
      initial={{
        scale: 1 - stackPosition * 0.05,
        y: stackPosition * -20,
        zIndex: 10 - stackPosition,
      }}
      animate={
        isTopCard
          ? controls
          : {
              scale: 1 - stackPosition * 0.05,
              y: stackPosition * -20,
            }
      }
      style={isTopCard ? { x, y, rotate, scale } : {}}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={isTopCard ? { scale: 0.97, cursor: "grabbing" } : {}}
      onDragEnd={isTopCard ? handleDragEnd : undefined}
    >
      <motion.div
        className="absolute top-10 left-10 text-green-500 text-5xl font-extrabold border-4 border-green-500 p-4 rounded-xl -rotate-12 select-none z-20 pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        SILLY
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 text-red-500 text-5xl font-extrabold border-4 border-red-500 p-4 rounded-xl rotate-12 select-none z-20 pointer-events-none"
        style={{ opacity: nopeOpacity }}
      >
        NOT SILLY
      </motion.div>
      <img
        className="absolute w-full h-full object-cover rounded-2xl pointer-events-none"
        src={imageSrc}
        alt={name}
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent rounded-2xl pointer-events-none z-10"></div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-4xl font-bold pointer-events-none z-10">
        {name}
      </div>
    </motion.div>
  );
};
