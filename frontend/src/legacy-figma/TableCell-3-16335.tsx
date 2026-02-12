import svgPaths from "./svg-ou7fvf0xne";

function MiExport() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="mi:export">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="mi:export">
          <path d={svgPaths.p21310d80} fill="var(--fill-0, #111827)" id="Vector" />
        </g>
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
    <div className="bg-white content-stretch flex items-center p-[2px] relative rounded-[4px] shrink-0" data-name="Button">
      <IconInterfaceOutlineEditRectangle />
    </div>
  );
}

function IconInterfaceOutlineTrash() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon/interface/outline/trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon/interface/outline/trash">
          <path clipRule="evenodd" d={svgPaths.p204174c0} fill="var(--fill-0, #111827)" fillRule="evenodd" id="Vector" />
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
      <MiExport />
      <Eye />
      <Button />
      <Button1 />
    </div>
  );
}