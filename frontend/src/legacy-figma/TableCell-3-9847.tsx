function TitleAndCaption() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Title and caption">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#111827] text-[14px] text-ellipsis whitespace-pre-wrap">Công khai</p>
    </div>
  );
}

export default function TableCell() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center px-[16px] py-[12px] relative size-full" data-name="Table cell">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <TitleAndCaption />
    </div>
  );
}