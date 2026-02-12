import svgPaths from "./svg-dtbrobuzgc";

function IconInterfaceOutlineTrash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/interface/outline/trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/interface/outline/trash">
          <path clipRule="evenodd" d={svgPaths.p204174c0} fill="var(--fill-0, #B9000E)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[4px] shrink-0 size-[20px]" data-name="Button">
      <IconInterfaceOutlineTrash />
    </div>
  );
}

export default function ButtonWeb() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit] size-full">
        <Button />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Xóa</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}