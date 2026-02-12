function TitleAndCaption() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Title and caption">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#111827] text-[14px] text-ellipsis w-full whitespace-pre-wrap">LSĐ01</p>
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