import svgPaths from "./svg-o0u7vcyjxi";

function Plus() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="plus 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_6696)" id="plus 2">
          <path d={svgPaths.p4b48000} fill="var(--fill-0, #B9000E)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_3_6696">
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
        <Plus />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Từ chối</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}