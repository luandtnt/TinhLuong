import svgPaths from "./svg-cu6oicafpb";
import imgExcel11 from "figma:asset/db11df3f5392b60548bb6c766aca52ccaf4405cb.png";

function Excel() {
  return (
    <div className="h-[39.503px] relative shrink-0 w-[40.483px]" data-name="excel (1) 1">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgExcel11} />
    </div>
  );
}

function IcRoundCancel() {
  return (
    <div className="absolute h-[15px] left-[49.3px] top-[1.5px] w-[15.179px]" data-name="ic:round-cancel">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.1793 15">
        <g id="ic:round-cancel">
          <path d={svgPaths.p16bec280} fill="var(--fill-0, #FE1E1E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center p-[12px] relative rounded-[8px] shrink-0 w-[65.777px]">
      <div aria-hidden="true" className="absolute border border-[#bfbfbf] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Excel />
      <p className="font-['SVN-Gilroy:Medium',sans-serif] leading-[normal] min-w-full not-italic overflow-hidden relative shrink-0 text-[#414142] text-[13px] text-ellipsis w-[min-content] whitespace-nowrap">vlbn002-nhap-du-lieu-nguoi-su</p>
      <IcRoundCancel />
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex items-start p-[16px] relative size-full">
        <Frame />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex h-full items-start justify-center p-[10px] relative rounded-[8px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#bdbdbd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="font-['SVN-Gilroy:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#414142] text-[14px] w-[313px] whitespace-pre-wrap">
        <p className="mb-0">{`- Bạn có thể chọn nhiều định dạng file: .doc, .docx, .pdf, .xls, .xlsx, .jpg, .jpeg, .png, .gif. `}</p>
        <p className="mb-0">{` `}</p>
        <p className="mb-0">{`- Hỗ trợ dung lượng 1 file lên tới 10MB. `}</p>
        <p className="mb-0">{` `}</p>
        <p className="mb-0">{`- Bạn có thể chọn và tải 1 hoặc nhiều file trong 1 lần thao tác. `}</p>
        <p className="mb-0">{` `}</p>
        <p className="mb-0">{`- Bạn có thể thực hiện kéo thả 1 hoặc nhiều file từ máy tính cá nhân. `}</p>
        <p className="mb-0">{` `}</p>
        <p>- Bạn có thể xem nội dung các file sau khi tải lên bằng cách kích đúp vào file muốn xem.</p>
      </div>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-start pb-[16px] relative size-full">
      <Frame1 />
      <Frame2 />
    </div>
  );
}