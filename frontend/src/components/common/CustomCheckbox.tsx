import svgPaths from "../../legacy-figma/svg-ie7wnzqhzk";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CustomCheckbox({ checked, onChange }: CustomCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative shrink-0 size-[16px] focus:outline-none focus:ring-2 focus:ring-[#b9000e] focus:ring-offset-1 rounded"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <rect
            fill={checked ? "#FEF2F2" : "white"}
            height="15"
            rx="3.5"
            stroke={checked ? "#B9000E" : "#4b5563"}
            width="15"
            x="0.5"
            y="0.5"
          />
          {checked && (
            <path
              d={svgPaths.p1961e300}
              stroke="#B9000E"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          )}
        </g>
      </svg>
    </button>
  );
}