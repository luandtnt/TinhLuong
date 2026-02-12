# Button Component - Hướng dẫn sử dụng

## Import

```tsx
import { Button } from './components/common/Button';
import { DeleteIcon, AddIcon, RefreshIcon } from './components/icons';
```

## Các Variants

### 1. Primary (Màu đỏ chính)
```tsx
<Button label="Xóa" variant="primary" />
<Button label="Thêm mới" variant="primary" />
```

### 2. Secondary (Màu xám)
```tsx
<Button label="Hủy" variant="secondary" />
```

### 3. Outline (Viền đỏ, nền trắng)
```tsx
<Button label="Xuất danh sách" variant="outline" />
<Button label="Phê duyệt" variant="outline" />
```

### 4. Ghost (Trong suốt)
```tsx
<Button label="Xem thêm" variant="ghost" />
```

### 5. Danger (Màu đỏ cảnh báo)
```tsx
<Button label="Xóa vĩnh viễn" variant="danger" />
```

## Sizes

```tsx
<Button label="Small" size="sm" />   // h-8
<Button label="Medium" size="md" />  // h-9 (default)
<Button label="Large" size="lg" />   // h-10
```

## Với Icons

### Icon bên trái (mặc định)
```tsx
<Button 
  label="Xóa" 
  icon={<DeleteIcon />} 
  variant="primary" 
/>

<Button 
  label="Thêm mới" 
  icon={<AddIcon />} 
  variant="primary" 
/>
```

### Icon bên phải
```tsx
<Button 
  label="Xuất file" 
  icon={<Download />} 
  iconPosition="right"
  variant="outline" 
/>
```

### Chỉ có icon (không có label)
```tsx
<Button 
  icon={<RefreshIcon />} 
  variant="primary" 
/>

<Button 
  icon={<DeleteIcon />} 
  variant="outline" 
/>
```

## States

### Disabled
```tsx
<Button 
  label="Không thể click" 
  disabled 
  variant="primary" 
/>
```

### Full Width
```tsx
<Button 
  label="Button toàn bộ chiều rộng" 
  fullWidth 
  variant="primary" 
/>
```

## Với onClick Handler

```tsx
<Button 
  label="Xóa" 
  icon={<DeleteIcon />} 
  variant="primary"
  onClick={() => {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      handleDelete();
    }
  }}
/>
```

## Custom className

```tsx
<Button 
  label="Custom" 
  variant="primary"
  className="shadow-lg hover:shadow-xl"
/>
```

## Ví dụ thực tế

### Toolbar Actions
```tsx
<div className="flex gap-2">
  <Button 
    icon={<DeleteIcon />} 
    label="Xóa" 
    variant="primary"
    onClick={handleDelete}
  />
  <Button 
    icon={<Upload />} 
    label="Nộp cấp trên" 
    variant="outline"
    onClick={handleSubmit}
  />
  <Button 
    icon={<FileDown />} 
    label="Xuất danh sách" 
    variant="outline"
    onClick={handleExport}
  />
  <Button 
    icon={<AddIcon />} 
    label="Thêm mới" 
    variant="primary"
    onClick={handleAdd}
  />
</div>
```

### Icon-only Buttons
```tsx
<div className="flex gap-2">
  <Button 
    icon={<RefreshIcon />} 
    variant="primary"
    onClick={handleRefresh}
  />
  <Button 
    icon={<Settings />} 
    variant="ghost"
    onClick={handleSettings}
  />
</div>
```

### Form Actions
```tsx
<div className="flex justify-end gap-3">
  <Button 
    label="Hủy bỏ" 
    variant="ghost"
    onClick={onCancel}
  />
  <Button 
    label="Lưu" 
    icon={<Save />} 
    variant="primary"
    onClick={onSave}
  />
</div>
```

## Props Interface

```typescript
interface ButtonProps {
  label?: string;              // Text hiển thị
  icon?: ReactNode;            // Icon component
  iconPosition?: 'left' | 'right';  // Vị trí icon
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;        // Handler khi click
  disabled?: boolean;          // Trạng thái disabled
  type?: 'button' | 'submit' | 'reset';  // HTML button type
  className?: string;          // Custom CSS classes
  fullWidth?: boolean;         // Button full width
}
```

## Icons có sẵn

- `DeleteIcon` - Icon xóa (thùng rác)
- `AddIcon` - Icon thêm (dấu +)
- `RefreshIcon` - Icon làm mới (mũi tên tròn)
- `TrashIcon` - Icon thùng rác
- `PlusIcon` - Icon dấu +
- `ExportIcon` - Icon xuất file
- `ApproveIcon` - Icon phê duyệt (check)
- `RejectIcon` - Icon từ chối (X)
- `CalendarIcon` - Icon lịch
- `ChevronDownIcon` - Icon mũi tên xuống

Hoặc sử dụng icons từ `lucide-react`:
```tsx
import { Upload, Download, Save, Edit, Eye } from 'lucide-react';
```
