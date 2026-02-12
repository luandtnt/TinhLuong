export default function Badge() {
  return (
    <div className="bg-[#fffbeb] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[6px] size-full" data-name="Badge">
      <div aria-hidden="true" className="absolute border border-[#fde68a] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b45309] text-[14px]">Chờ phê duyệt</p>
    </div>
  );
}