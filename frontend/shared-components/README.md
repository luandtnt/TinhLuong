# 🎨 Shared Components Library

Thư viện components, constants, và utilities dùng chung cho tất cả các dự án.

## 📦 Cấu trúc

```
shared-components/
├── constants/          # Design tokens (colors, spacing, typography)
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── index.ts
├── components/         # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   ├── Spinner.tsx
│   ├── StatusBadge.tsx
│   ├── icons/
│   │   └── CommonIcons.tsx
│   └── index.ts
├── utils/             # Utility functions
│   ├── classNames.ts
│   └── index.ts
├── index.ts           # Main entry point
└── README.md          # Documentation
```

## 🚀 Cách sử dụng

### 1. Copy folder vào dự án mới

```bash
# Copy toàn bộ folder shared-components vào dự án
cp -r shared-components /path/to/new-project/src/
```

### 2. Import và sử dụng

#### Import Constants

```tsx
import { COLORS, SPACING, TYPOGRAPHY } from '@/shared-components';

// Hoặc import riêng lẻ
import { PRIMARY_COLORS, TEXT_COLORS } from '@/shared-components/constants/colors';
```

#### Import Components

```tsx
import { Button, Input, Card, Badge, Modal } from '@/shared-components';

// Sử dụng
function MyComponent() {
  return (
    <Card padding="md" shadow="lg">
      <Input label="Email" required />
      <Button label="Submit" variant="primary" />
      <Badge variant="success">Đã duyệt</Badge>
    </Card>
  );
}
```

## 📚 Components

### Button

```tsx
<Button 
  label="Click me"
  variant="primary"  // primary | outline | ghost | danger
  size="md"          // sm | md | lg
  icon={<Icon />}
  iconPosition="left" // left | right
  fullWidth={false}
  loading={false}
  onClick={() => {}}
/>
```

### Input

```tsx
<Input
  label="Email"
  placeholder="email@example.com"
  required={true}
  error="Email không hợp lệ"
  helperText="Nhập email của bạn"
  inputSize="md"     // sm | md | lg
  fullWidth={true}
/>
```

### Card

```tsx
<Card 
  padding="md"       // none | sm | md | lg
  shadow="lg"        // none | sm | md | lg | xl
  border={true}
  hoverable={false}
>
  Content here
</Card>

// Card with header
<CardWithHeader
  title="Card Title"
  headerAction={<Button label="Action" />}
>
  Content here
</CardWithHeader>
```

### Badge

```tsx
<Badge 
  variant="success"  // success | warning | error | info | neutral
  size="md"          // sm | md
>
  Đã duyệt
</Badge>
```

### Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"          // sm | md | lg | xl
  closeOnBackdropClick={true}
  footer={
    <>
      <Button label="Cancel" variant="ghost" />
      <Button label="Confirm" variant="primary" />
    </>
  }
>
  Modal content
</Modal>

// Modal with default actions
<ModalWithActions
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  confirmText="Xác nhận"
  cancelText="Hủy"
  confirmLoading={false}
>
  Are you sure?
</ModalWithActions>
```

### Alert

```tsx
<Alert
  variant="success"  // success | warning | error | info
  title="Success!"
  icon={<CheckIcon />}
  onClose={() => {}}
>
  Operation completed successfully.
</Alert>
```

### Spinner & Loading

```tsx
<Spinner size={20} color="#b9000e" thickness={2} />

<Loading text="Đang tải..." />
```

### StatusBadge

```tsx
// Badge trạng thái tài liệu
<StatusBadge status="draft" />      // Nháp
<StatusBadge status="pending" />    // Chờ duyệt
<StatusBadge status="approved" />   // Đã duyệt
<StatusBadge status="rejected" />   // Từ chối
<StatusBadge status="published" />  // Đã xuất bản

// Badge trạng thái hiệu lực văn bản
<EffectiveStatusBadge status="effective" />  // Còn hiệu lực
<EffectiveStatusBadge status="expired" />    // Hết hiệu lực
<EffectiveStatusBadge status="pending" />    // Chưa có hiệu lực
```

### Icons

```tsx
import { 
  AddIcon, 
  EditIcon, 
  DeleteIcon, 
  ViewIcon,
  RefreshIcon,
  SearchIcon,
  DownloadIcon,
  UploadIcon,
  CloseIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MenuIcon,
  FilterIcon,
  SettingsIcon
} from '@/shared-components';

// Sử dụng
<AddIcon size={20} color="#b9000e" />
<EditIcon size={24} color="currentColor" className="hover:opacity-80" />
<DeleteIcon size={16} />

// Trong Button
<Button 
  label="Thêm mới" 
  variant="primary"
  icon={<AddIcon size={18} color="white" />}
  iconPosition="left"
/>
```

**Available Icons:**
- `AddIcon` - Thêm mới
- `EditIcon` - Chỉnh sửa
- `DeleteIcon` - Xóa
- `ViewIcon` - Xem
- `RefreshIcon` - Làm mới
- `SearchIcon` - Tìm kiếm
- `DownloadIcon` - Tải xuống
- `UploadIcon` - Tải lên
- `CloseIcon` - Đóng
- `CheckIcon` - Xác nhận
- `ChevronDownIcon` - Mũi tên xuống
- `ChevronRightIcon` - Mũi tên phải
- `MenuIcon` - Menu (hamburger)
- `FilterIcon` - Lọc
- `SettingsIcon` - Cài đặt

## 🎨 Constants

### Colors

```tsx
import { COLORS } from '@/shared-components';

// Primary
COLORS.primary.main      // #b9000e
COLORS.primary.hover     // #a00000
COLORS.primary.active    // #7d0000

// Text
COLORS.text.primary      // #1a1a1a
COLORS.text.secondary    // #333333
COLORS.text.tertiary     // #666666

// Status
COLORS.status.success.bg     // #f0fdf4
COLORS.status.success.border // #bbf7d0
COLORS.status.success.text   // #166534
```

### Spacing

```tsx
import { SPACING, BORDER_RADIUS, SHADOWS } from '@/shared-components';

SPACING.xs        // 4px
SPACING.sm        // 8px
SPACING.md        // 12px
SPACING.base      // 16px
SPACING.lg        // 20px
SPACING.xl        // 24px

BORDER_RADIUS.sm  // 4px
BORDER_RADIUS.md  // 6px
BORDER_RADIUS.lg  // 8px

SHADOWS.sm        // 0 1px 2px rgba(0, 0, 0, 0.05)
SHADOWS.lg        // 0 8px 16px rgba(0, 0, 0, 0.1)
```

### Typography

```tsx
import { TYPOGRAPHY, TEXT_STYLES } from '@/shared-components';

TYPOGRAPHY.fontSize.base      // 14px
TYPOGRAPHY.fontSize['2xl']    // 24px
TYPOGRAPHY.fontWeight.medium  // 500
TYPOGRAPHY.fontWeight.bold    // 700

// Preset styles
TEXT_STYLES.h1
TEXT_STYLES.body
TEXT_STYLES.label
```

## 🔧 Utilities

```tsx
import { classNames } from '@/shared-components';

const className = classNames(
  'base-class',
  isActive && 'active-class',
  isDisabled && 'disabled-class'
);
```

## 📝 Ví dụ hoàn chỉnh

### Login Form

```tsx
import { 
  Button, 
  Input, 
  Card, 
  COLORS, 
  SPACING 
} from '@/shared-components';

function LoginForm() {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.background.light,
      padding: SPACING.base,
    }}>
      <Card 
        padding="lg" 
        shadow="xl"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          textAlign: 'center',
          marginBottom: SPACING.xl,
        }}>
          Đăng nhập
        </h1>
        
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
        />
        
        <Input
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          required
        />
        
        <Button
          label="Đăng nhập"
          variant="primary"
          fullWidth
          style={{ marginTop: SPACING.lg }}
        />
      </Card>
    </div>
  );
}
```

### Data Table

```tsx
import { 
  Button, 
  Card, 
  Badge, 
  StatusBadge,
  AddIcon,
  DownloadIcon,
  EditIcon,
  DeleteIcon,
  COLORS, 
  SPACING 
} from '@/shared-components';

function DataTable() {
  return (
    <div style={{ padding: SPACING.xl }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: SPACING.xl,
      }}>
        <h1>Danh sách tài liệu</h1>
        <div style={{ display: 'flex', gap: SPACING.md }}>
          <Button 
            label="Xuất Excel" 
            variant="outline"
            icon={<DownloadIcon size={18} />}
            iconPosition="left"
          />
          <Button 
            label="Thêm mới" 
            variant="primary"
            icon={<AddIcon size={18} color="white" />}
            iconPosition="left"
          />
        </div>
      </div>
      
      <Card padding="none">
        <table style={{ width: '100%' }}>
          <thead style={{ backgroundColor: COLORS.background.light }}>
            <tr>
              <th style={{ padding: SPACING.base, textAlign: 'left' }}>
                Tên
              </th>
              <th style={{ padding: SPACING.base, textAlign: 'left' }}>
                Trạng thái
              </th>
              <th style={{ padding: SPACING.base, textAlign: 'left' }}>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: SPACING.base }}>Tài liệu 1</td>
              <td style={{ padding: SPACING.base }}>
                <StatusBadge status="approved" />
              </td>
              <td style={{ padding: SPACING.base }}>
                <div style={{ display: 'flex', gap: SPACING.sm }}>
                  <button style={{ cursor: 'pointer' }}>
                    <EditIcon size={18} color={COLORS.primary.main} />
                  </button>
                  <button style={{ cursor: 'pointer' }}>
                    <DeleteIcon size={18} color={COLORS.error.main} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
```

## 🎯 Best Practices

1. **Luôn sử dụng constants thay vì hardcode values:**
   ```tsx
   // ❌ Bad
   <div style={{ color: '#b9000e', padding: '24px' }}>
   
   // ✅ Good
   <div style={{ color: COLORS.primary.main, padding: SPACING.xl }}>
   ```

2. **Sử dụng components có sẵn thay vì tự tạo:**
   ```tsx
   // ❌ Bad
   <button style={{ backgroundColor: '#b9000e', ... }}>
   
   // ✅ Good
   <Button variant="primary" label="Click me" />
   ```

3. **Kết hợp components để tạo UI phức tạp:**
   ```tsx
   <Card>
     <Input label="Name" />
     <Badge variant="success">Active</Badge>
     <Button label="Save" variant="primary" />
   </Card>
   ```

## 📦 TypeScript Support

Tất cả components đều có TypeScript types đầy đủ:

```tsx
import type { ButtonVariant, BadgeVariant } from '@/shared-components';

const variant: ButtonVariant = 'primary';
const status: BadgeVariant = 'success';
```

## 🔄 Updates

Khi cần update design system:
1. Cập nhật constants trong `constants/`
2. Cập nhật components trong `components/`
3. Copy lại folder vào các dự án cần update

---

**Version:** 1.0  
**Last Updated:** 2024  
**Maintained by:** Development Team
