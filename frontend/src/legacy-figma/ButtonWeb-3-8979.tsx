import svgPaths from "./svg-dgm3im1l9u";

function RiExportFill() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ri:export-fill">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ri:export-fill">
          <path d={svgPaths.p24f6ec00} fill="var(--fill-0, #B9000E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function ButtonWeb() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
        <RiExportFill />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Xuất danh sách</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}