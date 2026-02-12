import svgPaths from "./svg-5s9g2pjvdy";
import imgExcel11 from "figma:asset/db11df3f5392b60548bb6c766aca52ccaf4405cb.png";

function Remove() {
  return (
    <div className="absolute inset-[29.2%]" data-name="remove">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3137 13.3138">
        <g>
          <path clipRule="evenodd" d={svgPaths.pc4d8140} fill="var(--fill-0, white)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function IconInterfaceSolidRemove() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="Icon/interface/solid/remove">
      <Remove />
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[#b9000e] h-[60px] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center p-[10px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-h-px min-w-px not-italic relative text-[18px] text-white whitespace-pre-wrap">Thêm mới nguồn dữ liệu</p>
          <IconInterfaceSolidRemove />
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Mã văn bản `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">https://chatgpt.com/</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label />
      <Input />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Người thêm `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nguyễn Thị B</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Ngày thêm `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">21/10/2025</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label2 />
      <Input2 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb2 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame5 />
      <Frame12 />
      <Frame13 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Tên văn bản `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">https://chatgpt.com/</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label3 />
      <Input3 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Ghi chú</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nhập ghi chú</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label4 />
      <Input4 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb4 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Frame11 />
      <Frame14 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#b9000e] content-stretch flex gap-[7px] h-[35px] items-center px-[13px] py-[9px] relative rounded-[3px] shrink-0">
      <div className="h-[8.75px] relative shrink-0 w-[8.855px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.85458 8.75">
          <path d={svgPaths.p3c579f80} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <p className="font-['SVN-Gilroy:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-white">Chọn tệp tin</p>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[37.503px] relative shrink-0 w-[22.774px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.7739 37.5034">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p102dfc00} fill="var(--fill-0, #2E7D32)" fillRule="evenodd" id="Vector" opacity="0.997" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[27.51px] relative shrink-0 w-[17.709px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7092 27.5098">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p82d7e00} fill="var(--fill-0, #EBEEF0)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[28.02%_31.38%_65.71%_56.15%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04797 2.47863">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p23678c00} fill="var(--fill-0, #388E3C)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[28%_12.62%_65.71%_74.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04594 2.48327">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p21bd7f00} fill="var(--fill-0, #398E3D)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[31.15%_56.37%_34.48%_15.52%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.3809 13.577">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p4ffa300} fill="var(--fill-0, #F8F8F8)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[40.52%_31.38%_53.21%_56.15%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04797 2.47863">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p291c8240} fill="var(--fill-0, #388E3C)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[40.5%_12.62%_53.22%_74.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04594 2.48327">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p21bd7f00} fill="var(--fill-0, #398E3D)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[53.01%_31.38%_40.71%_56.15%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04797 2.47863">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p291c8240} fill="var(--fill-0, #388E3C)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[53%_12.62%_40.71%_74.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04594 2.48327">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p21bd7f00} fill="var(--fill-0, #398E3D)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[65.52%_31.38%_28.21%_56.15%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04797 2.47863">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p291c8240} fill="var(--fill-0, #388E3C)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[65.5%_12.62%_28.22%_74.92%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.04594 2.48327">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p21bd7f00} fill="var(--fill-0, #398E3D)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Excel() {
  return (
    <div className="content-stretch flex items-center overflow-clip py-px relative shrink-0" data-name="excel (1) 1">
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
      <Group7 />
      <Group8 />
      <Group9 />
      <Group10 />
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

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center p-[12px] relative rounded-[8px] shrink-0 w-[65.777px]">
      <div aria-hidden="true" className="absolute border border-[#bfbfbf] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Excel />
      <p className="font-['SVN-Gilroy:Medium',sans-serif] leading-[normal] min-w-full not-italic overflow-hidden relative shrink-0 text-[#414142] text-[13px] text-ellipsis w-[min-content] whitespace-nowrap">vlbn002-nhap-du-lieu-nguoi-su</p>
      <IcRoundCancel />
    </div>
  );
}

function Excel1() {
  return (
    <div className="h-[39.503px] relative shrink-0 w-[40.483px]" data-name="excel (1) 1">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgExcel11} />
    </div>
  );
}

function IcRoundCancel1() {
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

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center p-[12px] relative rounded-[8px] shrink-0 w-[65.777px]">
      <div aria-hidden="true" className="absolute border border-[#bfbfbf] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Excel1 />
      <p className="font-['SVN-Gilroy:Medium',sans-serif] leading-[normal] min-w-full not-italic overflow-hidden relative shrink-0 text-[#414142] text-[13px] text-ellipsis w-[min-content] whitespace-nowrap">vlbn002-nhap-du-lieu-nguoi-su</p>
      <IcRoundCancel1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] h-[260px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative size-full">
        <Frame6 />
        <Frame7 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative rounded-[8px] shrink-0">
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

function Frame10() {
  return (
    <div className="content-stretch flex gap-[12px] items-start pb-[16px] relative shrink-0 w-full">
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <Frame15 />
        <Frame17 />
        <Frame4 />
        <Frame10 />
      </div>
    </div>
  );
}

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

function Frame1() {
  return (
    <div className="bg-[#b9000e] content-stretch flex gap-[10px] h-[36px] items-center p-[10px] relative rounded-[8px] shrink-0">
      <IconInterfaceOutlinePlus />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white">Thêm mới</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[60px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(17,24,39,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-end px-[10px] relative size-full">
          <ButtonWeb />
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame />
      <Frame16 />
      <Frame2 />
    </div>
  );
}

function PopupCreateTypeJob() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="popup create type job">
      <Frame3 />
    </div>
  );
}

function NsDmdaCr() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col items-center justify-center left-1/2 top-[calc(50%-0.5px)] w-[1112px]" data-name="NS_DMDA_CR_1">
      <PopupCreateTypeJob />
    </div>
  );
}

export default function Frame18() {
  return (
    <div className="bg-[rgba(0,0,0,0.2)] relative size-full">
      <NsDmdaCr />
    </div>
  );
}