import svgPaths from "./svg-i5iamwo5h4";
import imgExpandArrow from "figma:asset/d62e49071a8b99faff88deb45d242dcd829528ac.png";
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
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] min-h-px min-w-px not-italic relative text-[18px] text-white whitespace-pre-wrap">Xem chi tiết tài liệu về Lịch sử Đảng</p>
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
        <span className="leading-[20px]">{`Mã tài liệu `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">LSĐ01</p>
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

function Frame3() {
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
        <span className="leading-[20px]">{`Tên tài liệu `}</span>
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
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Lịch sử Đảng Cộng sản Việt Nam tập 1</p>
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

function Frame8() {
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
        <span className="leading-[20px]">{`Loại tài liệu `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Sách</p>
      <div className="relative shrink-0 size-[18px]" data-name="Expand Arrow">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExpandArrow} />
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame21 />
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

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb2 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[11]">
      <Frame3 />
      <Frame8 />
      <Frame9 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Độ mật `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Công khai</p>
      <div className="relative shrink-0 size-[18px]" data-name="Expand Arrow">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExpandArrow} />
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame22 />
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

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Trạng thái `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Chờ phê duyệt</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame23 />
        </div>
      </div>
    </div>
  );
}

function InputWeb4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative z-[1]" data-name="Input web">
      <Label4 />
      <Input4 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] isolate items-end min-h-px min-w-px relative">
      <InputWeb4 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Tác giả/ Cơ quan biên soạn `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nguyễn Văn A</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label5 />
      <Input5 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb5 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[10]">
      <Frame15 />
      <Frame16 />
      <Frame10 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Chủ biên</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nguyễn Văn A</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label6 />
      <Input6 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Năm sáng tác</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">2002</p>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame24 />
          <div className="relative shrink-0 size-[18px]" data-name="Expand Arrow">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExpandArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWeb7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label7 />
      <Input7 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb7 />
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Năm xuất bản</p>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">2010</p>
          <div className="relative shrink-0 size-[18px]" data-name="Expand Arrow">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExpandArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWeb8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label8 />
      <Input8 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb8 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[9]">
      <Frame18 />
      <Frame11 />
      <Frame19 />
    </div>
  );
}

function Label9() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Nhà xuất bản</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nhà xuất bản Phương Nam</p>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame26 />
        </div>
      </div>
    </div>
  );
}

function InputWeb9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label9 />
      <Input9 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb9 />
    </div>
  );
}

function Label10() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Nơi xuất bản</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nhà xuất bản Phương Nam</p>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame28 />
        </div>
      </div>
    </div>
  );
}

function InputWeb10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label10 />
      <Input10 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb10 />
    </div>
  );
}

function Label11() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Lần tái bản</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Tái bản lần 1</p>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function InputWeb11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label11 />
      <Input11 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb11 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[8]">
      <Frame25 />
      <Frame27 />
      <Frame29 />
    </div>
  );
}

function Label12() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Ngôn ngữ phát hành</p>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Tiếng Việt</p>
          <div className="relative shrink-0 size-[18px]" data-name="Expand Arrow">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExpandArrow} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InputWeb12() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label12 />
      <Input12 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb12 />
    </div>
  );
}

function Label13() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Người dịch</p>
    </div>
  );
}

function Frame34() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px" />;
}

function Input13() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame34 />
        </div>
      </div>
    </div>
  );
}

function InputWeb13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label13 />
      <Input13 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb13 />
    </div>
  );
}

function Label14() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Ngôn ngữ được phiên dịch</p>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <div className="relative shrink-0 size-[18px]" data-name="Expand Arrow">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgExpandArrow} />
      </div>
    </div>
  );
}

function Input14() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame36 />
        </div>
      </div>
    </div>
  );
}

function InputWeb14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label14 />
      <Input14 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb14 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[7]">
      <Frame32 />
      <Frame33 />
      <Frame35 />
    </div>
  );
}

function Label15() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Kích thước tài liệu</p>
    </div>
  );
}

function Input15() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] size-full" />
      </div>
    </div>
  );
}

function InputWeb15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label15 />
      <Input15 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb15 />
    </div>
  );
}

function Label16() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Ấn bản</p>
    </div>
  );
}

function Frame40() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px" />;
}

function Input16() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame40 />
        </div>
      </div>
    </div>
  );
}

function InputWeb16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label16 />
      <Input16 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb16 />
    </div>
  );
}

function Label17() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Số trang thay đổi</p>
    </div>
  );
}

function Frame42() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px" />;
}

function Input17() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame42 />
        </div>
      </div>
    </div>
  );
}

function InputWeb17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label17 />
      <Input17 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb17 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[6]">
      <Frame38 />
      <Frame39 />
      <Frame41 />
    </div>
  );
}

function Label18() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Mã số ISBN</p>
    </div>
  );
}

function Input18() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">1234567</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb18() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label18 />
      <Input18 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb18 />
    </div>
  );
}

function Label19() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Biên tập viên</p>
    </div>
  );
}

function Frame46() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px" />;
}

function Input19() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame46 />
        </div>
      </div>
    </div>
  );
}

function InputWeb19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label19 />
      <Input19 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb19 />
    </div>
  );
}

function Label20() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Bộ phận biên tập</p>
    </div>
  );
}

function Frame48() {
  return <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px" />;
}

function Input20() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame48 />
        </div>
      </div>
    </div>
  );
}

function InputWeb20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label20 />
      <Input20 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb20 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[5]">
      <Frame44 />
      <Frame45 />
      <Frame47 />
    </div>
  );
}

function Label21() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px]">
        <span className="leading-[20px]">{`Đơn vị của người tải lên `}</span>
        <span className="leading-[20px] text-[#ff0004]">*</span>
      </p>
    </div>
  );
}

function Input21() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic overflow-hidden relative text-[#111827] text-[14px] text-ellipsis whitespace-nowrap">Chi bộ Phòng Tổ chức - Đảng ủy Khối Doanh nghiệp</p>
        </div>
      </div>
    </div>
  );
}

function InputWeb21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label21 />
      <Input21 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb21 />
    </div>
  );
}

function Label22() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Người tải lên</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">Nguyễn Thị B</p>
    </div>
  );
}

function Input22() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame52 />
        </div>
      </div>
    </div>
  );
}

function InputWeb22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label22 />
      <Input22 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb22 />
    </div>
  );
}

function Label23() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#111827] text-[14px]">Ngày tải lên</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111827] text-[14px] whitespace-pre-wrap">22/10/2025</p>
      <div className="relative shrink-0 size-[12px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path d={svgPaths.p2a8f9580} fill="var(--fill-0, #414142)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Input23() {
  return (
    <div className="bg-[#efefef] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#c9cdd4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Frame54 />
        </div>
      </div>
    </div>
  );
}

function InputWeb23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Input web">
      <Label23 />
      <Input23 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[15px] items-end min-h-px min-w-px relative">
      <InputWeb23 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full z-[4]">
      <Frame50 />
      <Frame51 />
      <Frame53 />
    </div>
  );
}

function Label24() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pr-[12px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111827] text-[14px] whitespace-nowrap">
            <p className="leading-[20px]">Tóm tắt nội dung</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputInnerContainer() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="InputInnerContainer">
      <div className="flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px relative text-[14px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre-wrap">Cuốn sách trình bày quá trình hình thành, lãnh đạo và phát triển của Đảng Cộng sản Việt Nam từ khi ra đời đến các giai đoạn cách mạng quan trọng của đất nước. Nội dung khái quát bối cảnh lịch sử, đường lối, chủ trương của Đảng qua từng thời kỳ; vai trò lãnh đạo trong đấu tranh giành độc lập dân tộc, xây dựng và bảo vệ Tổ quốc. Thông qua việc hệ thống các sự kiện, mốc thời gian và bài học kinh nghiệm, cuốn sách góp phần làm rõ vai trò, vị trí của Đảng trong sự nghiệp cách mạng Việt Nam, đồng thời phục vụ công tác nghiên cứu, giảng dạy và học tập chính trị – lịch sử.</p>
      </div>
    </div>
  );
}

function InputContainer() {
  return (
    <div className="bg-white h-[104px] relative rounded-[5px] shrink-0 w-full" data-name="InputContainer">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
          <InputInnerContainer />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(66,80,102,0.4)] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[0px_2px_4px_0px_rgba(66,80,102,0.1)]" />
    </div>
  );
}

function Input24() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full z-[3]" data-name="Input">
      <Label24 />
      <InputContainer />
    </div>
  );
}

function IconInterfaceOutlinePlus() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon/interface/outline/plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon/interface/outline/plus">
          <path clipRule="evenodd" d={svgPaths.p3b0bc7c0} fill="var(--fill-0, #3B82F6)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonWeb() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0 z-[2]" data-name="Button web">
      <IconInterfaceOutlinePlus />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#3b82f6] text-[14px]">Thêm tập tin</p>
    </div>
  );
}

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

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center p-[12px] relative rounded-[8px] shrink-0 w-[65.777px]">
      <div aria-hidden="true" className="absolute border border-[#bfbfbf] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Excel />
      <p className="font-['SVN-Gilroy:Medium',sans-serif] leading-[normal] min-w-full not-italic overflow-hidden relative shrink-0 text-[#414142] text-[13px] text-ellipsis w-[min-content] whitespace-nowrap">vlbn002-nhap-du-lieu-nguoi-su</p>
      <IcRoundCancel />
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#c7c7c7] border-dashed inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex items-start p-[16px] relative size-full">
        <Frame4 />
      </div>
    </div>
  );
}

function Frame6() {
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

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-start min-h-px min-w-px pb-[16px] relative w-full z-[1]">
      <Frame5 />
      <Frame6 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
      <div className="content-stretch flex flex-col gap-[16px] isolate items-start p-[16px] relative size-full">
        <Frame12 />
        <Frame14 />
        <Frame17 />
        <Frame20 />
        <Frame31 />
        <Frame37 />
        <Frame43 />
        <Frame49 />
        <Input24 />
        <ButtonWeb />
        <Frame7 />
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

function ButtonWeb1() {
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

function Plus1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="plus 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_6696)" id="plus 2">
          <path d={svgPaths.p4b48000} fill="var(--fill-0, #B9000E)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_3_6696">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonWeb2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <Plus1 />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Từ chối phê duyệt</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TablerRefresh() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="tabler:refresh">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="tabler:refresh">
          <path d={svgPaths.p1c54160} id="Vector" stroke="var(--stroke-0, #B9000E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
}

function ButtonWeb3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <TablerRefresh />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Hủy phê duyệt</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function TeenyiconsTickCircleOutline() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="teenyicons:tick-circle-outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_3_6693)" id="teenyicons:tick-circle-outline">
          <path d={svgPaths.p2b1fcdf0} id="Vector" stroke="var(--stroke-0, #B9000E)" strokeWidth="1.06667" />
        </g>
        <defs>
          <clipPath id="clip0_3_6693">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonWeb4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button web">
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[14px] py-[8px] relative rounded-[inherit]">
        <TeenyiconsTickCircleOutline />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#b9000e] text-[14px]">Phê duyệt</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#b9000e] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <ButtonWeb2 />
      <ButtonWeb3 />
      <ButtonWeb4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-white h-[60px] relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(17,24,39,0.2)] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex gap-[10px] items-center justify-end px-[10px] relative size-full">
          <ButtonWeb1 />
          <Frame55 />
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full z-[1]">
      <Frame />
      <Frame13 />
      <Frame1 />
    </div>
  );
}

function PopupCreateTypeJob() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col isolate items-start min-h-px min-w-px relative w-full" data-name="popup create type job">
      <Frame2 />
    </div>
  );
}

export default function QunLyTaiLiuTaiLiuLchSDngXemRoleCpTren() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Quản lý tài liệu >> Tài liệu lịch sử Đảng >> Xem >> Role cấp trên">
      <PopupCreateTypeJob />
    </div>
  );
}