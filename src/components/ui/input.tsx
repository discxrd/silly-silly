import { type InputHTMLAttributes, useRef, useEffect, useState } from "react";
import Rough from "roughjs/bin/rough";
import { type Options } from "roughjs/bin/core";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [seed, setSeed] = useState(Math.random());

  useEffect(() => {
    const interval = setInterval(() => setSeed(Math.random()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
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
        fill: "white",
        stroke: isFocused ? "#000" : "#222",
        strokeWidth: 2,
        roughness: 2,
        seed: seed,
      };
      const rect = rs.rectangle(4, 4, size.width - 8, size.height - 8, options);
      svgRef.current.appendChild(rect);
    }
  }, [size, isFocused, seed]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
        minHeight: "50px",
      }}
    >
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative z-10 bg-transparent outline-none w-full h-full p-2 text-lg"
        style={{
          fontFamily: "'Kalam', cursive",
          color: "#333",
        }}
        {...props}
      />
    </div>
  );
};

export default Input;
