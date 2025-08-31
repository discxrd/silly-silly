import {
  type InputHTMLAttributes,
  useRef,
  useEffect,
  useState,
  useId,
} from "react";
import Rough from "roughjs/bin/rough";
import { type Options } from "roughjs/bin/core";

const RoughUploadIcon = ({
  seed,
  className,
}: {
  seed: number;
  className?: string;
}) => {
  const iconSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = iconSvgRef.current;
    if (!svg) return;

    svg.innerHTML = "";
    const rsIcon = Rough.svg(svg);

    const path1 = "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"; // Нижняя "чаша"
    const path2 = "M17 8L12 3L7 8"; // Стрелка
    const path3 = "M12 3L12 15"; // "Ножка" стрелки

    const options: Options = {
      stroke: "currentColor",
      strokeWidth: 1.5,
      roughness: 2,
      seed: seed,
    };

    // Рисуем каждый путь
    svg.appendChild(rsIcon.path(path1, options));
    svg.appendChild(rsIcon.path(path2, options));
    svg.appendChild(rsIcon.path(path3, options));
  }, [seed]);

  return <svg ref={iconSvgRef} viewBox="0 0 24 24" className={className} />;
};

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  className?: string;
  placeholder?: string;
}

const FileInput = ({ className, placeholder, ...props }: Props) => {
  const id = useId();
  const [fileName, setFileName] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
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
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
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
        stroke: "#222",
        strokeWidth: 2,
        roughness: 1.8,
        seed: seed,
        fillStyle: "hachure",
        hachureGap: 5,
        hachureAngle: -45,
        fillWeight: isHovered ? 1.5 : 0.5,
      };
      const rect = rs.rectangle(4, 4, size.width - 8, size.height - 8, options);
      svgRef.current.appendChild(rect);
    }
  }, [size, seed, isHovered]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name || "");
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[54px] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <label
        htmlFor={id}
        className="relative z-10 flex items-center w-full h-full px-4 py-3 text-lg cursor-pointer"
      >
        <RoughUploadIcon
          seed={seed}
          className="w-6 h-6 mr-3 text-gray-500 flex-shrink-0"
        />

        <span
          className={`truncate ${fileName ? "text-black" : "text-gray-400"}`}
        >
          {fileName || placeholder || "Выберите файл..."}
        </span>
      </label>

      <input
        id={id}
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        {...props}
      />
    </div>
  );
};

export default FileInput;
