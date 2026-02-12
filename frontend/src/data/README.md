# Mock Data Documentation

## Overview

File `mockDocuments.ts` chứa mock data đầy đủ cho tất cả loại nội dung trong hệ thống.

## Structure

### ExtendedDocument Interface

```typescript
interface ExtendedDocument {
  // Basic info for table display
  id: string;
  code: string;
  title: string;
  type: string;
  classification: string;
  author: string;
  createdDate: string;
  status: 'approved' | 'draft' | 'pending' | 'rejected';
  uploadDate?: string;
  
  // Full content data for modals (Add/Edit/View)
  contentData: Partial<ContentFormData>;
}
```

## Content Types

### 1. VAN_BAN (Văn bản)
- **mockVanBanDocuments**: 2 documents
- Includes: Nghị quyết, Chỉ thị
- Fields: documentType, issueDate, documentNumber, issuer, issueLocation, effectiveStatus, relatedDocuments

### 2. SACH (Sách)
- **mockSachDocuments**: 2 documents
- Includes: Lịch sử Đảng, Tư tưởng Hồ Chí Minh
- Fields: publishYear, publisher, edition, isbn, publishLocation, hasTranslation, translator, originalLanguage, translatedLanguage

### 3. AUDIO
- **mockAudioDocuments**: 1 document
- Includes: Bài phát biểu
- Fields: releaseDate, platform, programName, episodeNumber, language
- FileMetadata: duration (seconds)

### 4. VIDEO
- **mockVideoDocuments**: 1 document
- Includes: Lễ kỷ niệm
- Fields: releaseDate, platform, channelName, eventName, location, language
- FileMetadata: duration, resolution

### 5. HINH_ANH (Hình ảnh)
- **mockHinhAnhDocuments**: 1 document
- Includes: Ảnh lịch sử
- Fields: creationDate, imageType, caption, altText, collection
- FileMetadata: dimensions (width x height)

## Usage

### Import All Documents
```typescript
import { allMockDocuments } from '@/data/mockDocuments';

// Use in page
<DocumentListPage
  pageTitle="Danh sách tài liệu"
  role="supervisor"
  initialDocuments={allMockDocuments}
/>
```

### Import by Type
```typescript
import { 
  mockVanBanDocuments,
  mockSachDocuments,
  mockAudioDocuments,
  mockVideoDocuments,
  mockHinhAnhDocuments
} from '@/data/mockDocuments';
```

### Helper Functions

#### Get Documents by Type
```typescript
import { getDocumentsByType } from '@/data/mockDocuments';

const sachDocs = getDocumentsByType('SACH');
const vanBanDocs = getDocumentsByType('VAN_BAN');
```

#### Get Document by ID
```typescript
import { getDocumentById } from '@/data/mockDocuments';

const doc = getDocumentById('vb-001');
if (doc) {
  console.log(doc.contentData); // Full ContentFormData
}
```

## ContentFormData Structure

Each document's `contentData` contains:

```typescript
{
  type: ContentType;
  common: {
    code: string;
    title: string;
    classification: ClassificationLevel;
    authors: string[];
    summary: string;
    language: string;
  };
  sourceMetadata: {
    sourceType: 'INTERNAL' | 'ONLINE';
    url?: string;
    accessedAt?: string;
    internalCode?: string;
    providerOrg?: string;
    rights?: RightsType;
    rightsNote?: string;
  };
  specific: VanBanFields | SachFields | AudioFields | VideoFields | HinhAnhFields;
  fileMetadata: {
    fileName: string;
    fileSize: number;
    fileFormat: string;
    pageCount?: number;
    duration?: number;
    resolution?: string;
    dimensions?: { width: number; height: number };
  };
}
```

## Source Metadata Examples

### Internal Source
```typescript
sourceMetadata: {
  sourceType: 'INTERNAL',
  internalCode: 'LT-2025-001',
  providerOrg: 'Văn phòng Trung ương Đảng',
  rights: 'NOI_BO',
  rightsNote: 'Chỉ sử dụng nội bộ trong hệ thống Đảng',
}
```

### Online Source
```typescript
sourceMetadata: {
  sourceType: 'ONLINE',
  url: 'https://dangcongsan.vn/chi-thi-05-ct-tw',
  accessedAt: '30/01/2025',
  rights: 'CONG_KHAI',
}
```

## File Metadata Examples

### PDF Document
```typescript
fileMetadata: {
  fileName: 'nghi-quyet-01-nq-tw.pdf',
  fileSize: 2458624, // bytes
  fileFormat: 'PDF',
  pageCount: 45,
}
```

### Audio File
```typescript
fileMetadata: {
  fileName: 'phat-bieu-tbt-hntw8.mp3',
  fileSize: 45678912,
  fileFormat: 'MP3',
  duration: 3845, // seconds (64 minutes)
}
```

### Video File
```typescript
fileMetadata: {
  fileName: 'le-ky-niem-95-nam-dang.mp4',
  fileSize: 1258291200,
  fileFormat: 'MP4',
  duration: 7200, // 2 hours
  resolution: '1920x1080',
}
```

### Image File
```typescript
fileMetadata: {
  fileName: 'bac-ho-voi-dong-bao-dtts.jpg',
  fileSize: 3456789,
  fileFormat: 'JPEG',
  dimensions: { width: 2400, height: 1800 },
}
```

## Adding New Mock Data

1. Create new document object following ExtendedDocument interface
2. Ensure `contentData` has all required fields for the content type
3. Add to appropriate array (mockVanBanDocuments, mockSachDocuments, etc.)
4. Document will automatically appear in `allMockDocuments`

Example:
```typescript
const newDocument: ExtendedDocument = {
  id: 'vb-003',
  code: 'VB-20250201-003',
  title: 'New Document Title',
  type: 'Văn bản',
  classification: 'Công khai',
  author: 'Author Name',
  createdDate: '2025-02-01',
  uploadDate: '2025-02-01',
  status: 'approved',
  contentData: {
    type: 'VAN_BAN',
    common: { /* ... */ },
    sourceMetadata: { /* ... */ },
    specific: { /* ... */ },
    fileMetadata: { /* ... */ },
  },
};

mockVanBanDocuments.push(newDocument);
```

## Benefits

✅ **Complete data** - All fields populated for realistic testing  
✅ **Type-safe** - Full TypeScript support  
✅ **Reusable** - Same data for table and modals  
✅ **Easy to extend** - Add new documents easily  
✅ **Realistic** - Based on actual Vietnamese Party documents
