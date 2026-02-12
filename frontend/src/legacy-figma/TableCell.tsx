import svgPaths from "./svg-qxzwmhm4j9";

function TeenyiconsTickCircleOutline() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="teenyicons:tick-circle-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_6676)" id="teenyicons:tick-circle-outline">
          <path d={svgPaths.p2b1fcdf0} id="Vector" opacity="0.5" stroke="var(--stroke-0, black)" strokeWidth="1.06667" />
        </g>
        <defs>
          <clipPath id="clip0_3_6676">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="plus 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_6699)" id="plus 2">
          <path d={svgPaths.p4b48000} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_3_6699">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Eye() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Eye">
          <g id="Icon">
            <path d={svgPaths.p3962d7f0} stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15" />
            <path d={svgPaths.p3b27f100} stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.15" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function IconInterfaceOutlineEditRectangle() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/interface/outline/edit-rectangle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/interface/outline/edit-rectangle">
          <path clipRule="evenodd" d={svgPaths.p35246b80} fill="var(--fill-0, #111827)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex items-center opacity-50 p-[2px] relative rounded-[4px] shrink-0" data-name="Button">
      <IconInterfaceOutlineEditRectangle />
    </div>
  );
}

function IconInterfaceOutlineTrash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/interface/outline/trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/interface/outline/trash">
          <path clipRule="evenodd" d={svgPaths.p204174c0} fill="var(--fill-0, #111827)" fillRule="evenodd" id="Vector" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex items-center p-[2px] relative rounded-[4px] shrink-0" data-name="Button">
      <IconInterfaceOutlineTrash />
    </div>
  );
}

export default function TableCell() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative size-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <TeenyiconsTickCircleOutline />
      <Plus />
      <Eye />
      <Button />
      <Button1 />
    </div>
  );
}