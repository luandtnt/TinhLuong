import svgPaths from "./svg-3vmsj4f3lp";

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

export default function Frame() {
  return (
    <div className="bg-[#b9000e] content-stretch flex gap-[10px] items-center p-[10px] relative rounded-[8px] size-full">
      <IconInterfaceOutlinePlus />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white">Thêm mới</p>
    </div>
  );
}