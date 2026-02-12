# Add Content Modal - Thêm mới nội dung

Modal wizard 2 bước để thêm mới nội dung với đầy đủ validation và auto-fill metadata.

## Tính năng

### Bước 1: Chọn loại nội dung
- 5 loại: Văn bản, Sách, Audio, Video, Hình ảnh
- UI dạng card button với icon

### Bước 2: Form nhập liệu
- **Thông tin chung** (tất cả loại):
  - Mã nội dung (auto-generate, có thể sửa)
  - Tên nội dung
  - Độ mật (Công khai/Nội bộ/Mật/Tối mật)
  - Tác giả/Cơ quan (multi-chip)
  - Tóm tắt nội dung
  - Ngôn ngữ

- **Thông tin trích dẫn**:
  - Chuẩn: APA 7 hoặc Harvard (Author–Date)
  - Nguồn: Nội bộ hoặc Trực tuyến
  - URL (nếu trực tuyến)
  - Trích dẫn xem trước (auto-render)

- **Tệp đính kèm**:
  - Upload file hoặc nhập URL
  - Auto-extract metadata:
    - PDF/DOCX: số trang
    - Audio: thời lượng
    - Video: thời lượng, độ phân giải, thumbnail
    - Hình ảnh: kích thước px

- **Thông tin đặc thù theo loại**:
  - **Văn bản**: Loại văn bản, ngày/năm ban hành, số hiệu, đơn vị ban hành, tình trạng hiệu lực
  - **Sách**: Năm xuất bản, nhà xuất bản, ISBN, ấn bản, bản dịch
  - **Audio**: Ngày phát hành, nền tảng, tên chương trình, số tập
  - **Video**: Ngày phát hành, nền tảng, tên kênh, sự kiện
  - **Hình ảnh**: Ngày tạo, loại hình ảnh, caption, alt text, license

## Validation

Tất cả message validation bằng tiếng Việt:
- "Vui lòng nhập mã nội dung."
- "Vui lòng nhập tên nội dung."
- "Vui lòng chọn độ mật."
- "Vui lòng nhập tác giả/cơ quan."
- "Vui lòng nhập tóm tắt nội dung."
- "Vui lòng chọn chuẩn trích dẫn."
- "Vui lòng tải lên tệp hoặc nhập URL nguồn."
- "URL không hợp lệ."
- "ISBN không hợp lệ (chỉ chấp nhận ISBN-10 hoặc ISBN-13)."

## Đổi loại nội dung

Khi user click "Đổi loại" ở bước 2:
- Nếu form chưa có thay đổi → quay về bước 1
- Nếu đã nhập dữ liệu → hiện confirm modal
- Nếu đồng ý: giữ lại trường chung, reset trường đặc thù

## Actions

- **Lưu nháp**: Lưu với status = DRAFT
- **Nộp cấp trên**: Submit với status = PENDING_APPROVAL

## Usage

```tsx
import { AddContentModal } from '@/components/modals';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Thêm mới
      </button>

      <AddContentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          // Refresh data
          setIsOpen(false);
        }}
      />
    </>
  );
}
```

## File Structure

```
AddContentModal/
├── AddContentModal.tsx          # Main modal component
├── StepSelectType.tsx           # Step 1: Select content type
├── StepContentForm.tsx          # Step 2: Form
├── ConfirmChangeTypeModal.tsx   # Confirm dialog
├── sections/
│   ├── CommonFieldsSection.tsx      # Common fields
│   ├── CitationFieldsSection.tsx    # Citation fields
│   ├── FileUploadSection.tsx        # File upload
│   ├── VanBanFieldsSection.tsx      # Document-specific
│   ├── SachFieldsSection.tsx        # Book-specific
│   ├── AudioFieldsSection.tsx       # Audio-specific
│   ├── VideoFieldsSection.tsx       # Video-specific
│   └── HinhAnhFieldsSection.tsx     # Image-specific
└── index.ts
```

## Utils

- `src/utils/citation.ts`: Render citation theo APA7/Harvard
- `src/utils/contentCode.ts`: Generate mã nội dung, validate ISBN
- `src/utils/fileMeta.ts`: Extract file metadata

## Types

- `src/types/content.ts`: All TypeScript interfaces
