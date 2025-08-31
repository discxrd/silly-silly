import { type ButtonHTMLAttributes, useRef, useEffect, useState } from "react";
import Rough from "roughjs/bin/rough";
import { type Options } from "roughjs/bin/core";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...rest }: Props) => {
  const [isPressed, setIsPressed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [seed, setSeed] = useState(Math.random());

  useEffect(() => {
    const interval = setInterval(() => setSeed(Math.random()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const element = buttonRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (svgRef.current && size.width > 0 && size.height > 0) {
      svgRef.current.innerHTML = "";
      const rs = Rough.svg(svgRef.current);
      const options: Options = {
        fill: isPressed ? "rgba(0, 0, 0, 0.05)" : "white",
        stroke: "#000",
        strokeWidth: 2,
        roughness: 1.8,
        seed: seed,
      };
      const rect = rs.rectangle(4, 4, size.width - 8, size.height - 8, options);
      svgRef.current.appendChild(rect);
    }
  }, [size, isPressed, seed]);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-pointer border-none bg-none text-xl ${className}`}
      {...rest}
    >
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <span className="relative z-10 flex h-full w-full items-center justify-center px-7 py-3">
        {children}
      </span>
    </button>
  );
};

export default Button;
