import svgPaths from "./svg-ie7wnzqhzk";

function CheckboxWeb() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Checkbox web">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Checkbox web">
          <rect fill="var(--fill-0, #FEF2F2)" height="15" id="Rectangle 6" rx="3.5" stroke="var(--stroke-0, #B9000E)" width="15" x="0.5" y="0.5" />
          <path d={svgPaths.p1961e300} id="Vector" stroke="var(--stroke-0, #B9000E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <g id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

export default function TableCell() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center justify-center px-[16px] py-[12px] relative size-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <CheckboxWeb />
    </div>
  );
}