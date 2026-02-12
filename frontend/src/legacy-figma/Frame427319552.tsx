import svgPaths from "./svg-eqhaczw1as";

function Plus() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="plus 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_1_6481)" id="plus 1">
          <path d={svgPaths.p4b48000} fill="var(--fill-0, #374151)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_6481">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonWeb() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <Plus />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Hủy bỏ</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5db] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function MiExport() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="mi:export">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="mi:export">
          <path d={svgPaths.p3d2a5200} fill="var(--fill-0, #B9000E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonWeb1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <MiExport />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Nộp cấp trên</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function IconInterfaceOutlinePlus() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon/interface/outline/plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon/interface/outline/plus">
          <path clipRule="evenodd" d={svgPaths.p3b0bc7c0} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#b9000e] content-stretch flex gap-[10px] h-[36px] items-center p-[10px] relative rounded-[8px] shrink-0">
      <IconInterfaceOutlinePlus />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white">Thêm mới</p>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-white content-stretch flex gap-[10px] items-center justify-end px-[10px] relative size-full">
      <div aria-hidden="true" className="absolute border-[rgba(17,24,39,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <ButtonWeb />
      <ButtonWeb1 />
      <Frame />
    </div>
  );
}