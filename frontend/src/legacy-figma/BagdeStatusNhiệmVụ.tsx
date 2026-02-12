function Badge() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex h-full items-center px-[8px] py-[2px] relative rounded-[6px] shrink-0" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#bbf7d0] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#15803d] text-[14px]">Đã phê duyệt</p>
    </div>
  );
}

export default function BagdeStatusNhimV() {
  return (
    <div className="content-stretch flex items-start relative size-full" data-name="Bagde/Status/Nhiệm vụ">
      <Badge />
    </div>
  );
}