import { type HTMLAttributes, useRef, useEffect, useState } from "react";
import Rough from "roughjs/bin/rough";
import { type Options } from "roughjs/bin/core";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, ...rest }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [seed, setSeed] = useState(Math.random());

  useEffect(() => {
    const interval = setInterval(() => setSeed(Math.random()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const element = divRef.current;
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
        stroke: "#000",
        strokeWidth: 2,
        roughness: 1.5,
        seed: seed,
      };
      const rect = rs.rectangle(4, 4, size.width - 8, size.height - 8, options);
      svgRef.current.appendChild(rect);
    }
  }, [size, seed]);

  return (
    <div
      ref={divRef}
      className={`relative inline-block bg-none ${className}`}
      {...rest}
    >
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default Card;
