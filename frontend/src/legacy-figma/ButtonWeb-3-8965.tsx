import svgPaths from "./svg-ts1pssuv4w";

function TeenyiconsTickCircleOutline() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="teenyicons:tick-circle-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_6693)" id="teenyicons:tick-circle-outline">
          <path d={svgPaths.p2b1fcdf0} id="Vector" stroke="var(--stroke-0, #B9000E)" strokeWidth="1.06667" />
        </g>
        <defs>
          <clipPath id="clip0_3_6693">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function ButtonWeb() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
        <TeenyiconsTickCircleOutline />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Phê duyệt</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}