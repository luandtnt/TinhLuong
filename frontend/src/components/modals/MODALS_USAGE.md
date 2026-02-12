# Content Modals Usage Guide

## Overview

Có 3 modal chính để quản lý nội dung:

1. **AddContentModal** - Thêm mới nội dung (wizard 2 bước)
2. **EditContentModal** - Chỉnh sửa nội dung
3. **ViewContentModal** - Xem chi tiết nội dung (readonly)

Tất cả 3 modal đều **tái sử dụng** các section components giống nhau từ `AddContentModal/sections/`.

## 1. AddContentModal

Modal wizard 2 bước để thêm mới nội dung.

### Usage

```tsx
import { AddContentModal } from '@/components/modals';

function MyPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSuccess = () => {
    // Refresh data, show toast, etc.
    console.log('Content added successfully');
  };

  return (
    <>
      <button onClick={() => setShowAddModal(true)}>Thêm mới</button>
      
      <AddContentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
```

### Features
- Bước 1: Chọn loại nội dung (VAN_BAN, SACH, AUDIO, VIDEO, HINH_ANH)
- Bước 2: Form nhập liệu động theo loại
- Validation đầy đủ
- 2 actions: "Lưu nháp" và "Nộp cấp trên"

## 2. EditContentModal

Modal để chỉnh sửa nội dung đã có.

### Usage

```tsx
import { EditContentModal } from '@/components/modals';

function MyPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);

  const handleEdit = (doc) => {
    // Convert document to ContentFormData format
    const formData = {
      type: doc.type,
      common: {
        code: doc.code,
        title: doc.title,
        classification: doc.classification,
        authors: doc.authors,
        summary: doc.summary,
        language: doc.language,
      },
      sourceMetadata: {
        sourceType: doc.sourceType,
        url: doc.url,
        // ... other source metadata
      },
      specific: {
        // Type-specific fields
      },
      fileMetadata: doc.fileMetadata,
    };
    
    setEditingDocument(formData);
    setShowEditModal(true);
  };

  const handleSuccess = () => {
    console.log('Content updated successfully');
    setShowEditModal(false);
  };

  return (
    <>
      <button onClick={() => handleEdit(document)}>Chỉnh sửa</button>
      
      <EditContentModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleSuccess}
        documentId={document.id}
        initialData={editingDocument}
      />
    </>
  );
}
```

### Features
- Hiển thị form với dữ liệu có sẵn
- Cho phép chỉnh sửa tất cả fields
- Validation đầy đủ
- Action: "Lưu thay đổi"

## 3. ViewContentModal

Modal readonly để xem chi tiết nội dung.

### Usage

```tsx
import { ViewContentModal } from '@/components/modals';

function MyPage() {
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null);

  const handleView = (doc) => {
    // Convert document to ContentFormData format
    const formData = {
      type: doc.type,
      common: { /* ... */ },
      sourceMetadata: { /* ... */ },
      specific: { /* ... */ },
      fileMetadata: doc.fileMetadata,
    };
    
    setViewingDocument(formData);
    setShowViewModal(true);
  };

  // For Supervisor role
  const handleApprove = () => {
    console.log('Approved');
    setShowViewModal(false);
  };

  const handleReject = () => {
    console.log('Rejected');
    setShowViewModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelled');
    setShowViewModal(false);
  };

  return (
    <>
      <button onClick={() => handleView(document)}>Xem</button>
      
      {/* For Subordinate */}
      <ViewContentModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        data={viewingDocument}
        role="subordinate"
      />

      {/* For Supervisor */}
      <ViewContentModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        data={viewingDocument}
        role="supervisor"
        onApprove={handleApprove}
        onReject={handleReject}
        onCancel={handleCancel}
      />
    </>
  );
}
```

### Features
- Hiển thị tất cả thông tin readonly
- Hỗ trợ 2 roles:
  - **subordinate**: Chỉ có nút "Đóng"
  - **supervisor**: Có thêm "Phê duyệt", "Từ chối phê duyệt", "Huỷ phê duyệt"
- Hiển thị đầy đủ metadata, file info, summary

## Shared Components

Tất cả 3 modal đều sử dụng các section components từ `AddContentModal/sections/`:

- `CommonFieldsSection` - Thông tin chung
- `VanBanFieldsSection` - Thông tin văn bản
- `SachFieldsSection` - Thông tin sách
- `AudioFieldsSection` - Thông tin audio
- `VideoFieldsSection` - Thông tin video
- `HinhAnhFieldsSection` - Thông tin hình ảnh
- `SourceMetadataSection` - Thông tin nguồn & xuất bản
- `FileUploadSection` - Tệp đính kèm

## Data Structure

Tất cả modal đều sử dụng `ContentFormData` type:

```typescript
interface ContentFormData {
  type: ContentType; // 'VAN_BAN' | 'SACH' | 'AUDIO' | 'VIDEO' | 'HINH_ANH'
  common: CommonFields;
  sourceMetadata: SourceMetadata;
  file?: File | null;
  fileUrl?: string;
  fileMetadata?: FileMetadata;
  specific: VanBanFields | SachFields | AudioFields | VideoFields | HinhAnhFields;
}
```

## Migration from Old Pages

Nếu bạn đang dùng các page cũ như `EditDocumentPage`, `SupervisorViewDocumentDetailPage`, bạn nên:

1. Thay thế bằng modal mới
2. Convert data format từ old structure sang `ContentFormData`
3. Sử dụng modal trong DocumentListPage hoặc các page khác

## Benefits

✅ **Code reuse**: Tất cả sections được tái sử dụng  
✅ **Consistency**: UI/UX nhất quán giữa Add/Edit/View  
✅ **Maintainability**: Chỉ cần sửa 1 lần ở section, áp dụng cho cả 3 modal  
✅ **Type safety**: Sử dụng TypeScript types chung  
✅ **Validation**: Logic validation được chia sẻ
