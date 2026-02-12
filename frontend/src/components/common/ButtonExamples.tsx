import { Button } from './Button';
import { DeleteIcon } from '../icons/DeleteIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { ExportIcon } from '../icons/ExportIcon';
import { ApproveIcon } from '../icons/ApproveIcon';
import { RejectIcon } from '../icons/RejectIcon';
import { Upload, Download, Save, Edit, Eye } from 'lucide-react';

/**
 * Component này chỉ để demo cách sử dụng Button component
 * Bạn có thể xóa file này sau khi đã hiểu cách dùng
 */
export function ButtonExamples() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Outline" variant="outline" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Danger" variant="danger" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button label="Small" size="sm" variant="primary" />
          <Button label="Medium" size="md" variant="primary" />
          <Button label="Large" size="lg" variant="primary" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Buttons with Icons (Left)</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            label="Xóa" 
            icon={<DeleteIcon />} 
            variant="primary" 
          />
          <Button 
            label="Thêm mới" 
            icon={<PlusIcon />} 
            variant="primary" 
          />
          <Button 
            label="Xuất danh sách" 
            icon={<ExportIcon />} 
            variant="outline" 
          />
          <Button 
            label="Phê duyệt" 
            icon={<ApproveIcon />} 
            variant="outline" 
          />
          <Button 
            label="Từ chối" 
            icon={<RejectIcon />} 
            variant="outline" 
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Buttons with Lucide Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            label="Upload" 
            icon={<Upload />} 
            variant="primary" 
          />
          <Button 
            label="Download" 
            icon={<Download />} 
            variant="secondary" 
          />
          <Button 
            label="Save" 
            icon={<Save />} 
            variant="outline" 
          />
          <Button 
            label="Edit" 
            icon={<Edit />} 
            variant="ghost" 
          />
          <Button 
            label="View" 
            icon={<Eye />} 
            variant="outline" 
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Icon Only Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button icon={<DeleteIcon />} variant="primary" />
          <Button icon={<PlusIcon />} variant="primary" />
          <Button icon={<Edit />} variant="outline" />
          <Button icon={<Eye />} variant="ghost" />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Icons on Right</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            label="Xuất file" 
            icon={<Download />} 
            iconPosition="right"
            variant="primary" 
          />
          <Button 
            label="Tải lên" 
            icon={<Upload />} 
            iconPosition="right"
            variant="outline" 
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Disabled State</h2>
        <div className="flex flex-wrap gap-4">
          <Button label="Disabled Primary" variant="primary" disabled />
          <Button label="Disabled Outline" variant="outline" disabled />
          <Button 
            label="Disabled with Icon" 
            icon={<DeleteIcon />} 
            variant="primary" 
            disabled 
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Full Width</h2>
        <Button 
          label="Full Width Button" 
          icon={<Save />} 
          variant="primary" 
          fullWidth 
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Usage Examples</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
{`// Import
import { Button } from './components/common/Button';
import { DeleteIcon } from './components/icons/DeleteIcon';

// Basic usage
<Button label="Xóa" variant="primary" />

// With icon
<Button 
  label="Xóa" 
  icon={<DeleteIcon />} 
  variant="primary" 
  onClick={() => handleDelete()}
/>

// Different variants
<Button label="Primary" variant="primary" />
<Button label="Secondary" variant="secondary" />
<Button label="Outline" variant="outline" />
<Button label="Ghost" variant="ghost" />
<Button label="Danger" variant="danger" />

// Different sizes
<Button label="Small" size="sm" />
<Button label="Medium" size="md" />
<Button label="Large" size="lg" />

// Icon position
<Button label="Left Icon" icon={<Icon />} iconPosition="left" />
<Button label="Right Icon" icon={<Icon />} iconPosition="right" />

// Icon only
<Button icon={<DeleteIcon />} variant="primary" />

// Disabled
<Button label="Disabled" disabled />

// Full width
<Button label="Full Width" fullWidth />

// Custom className
<Button label="Custom" className="my-custom-class" />
`}
          </pre>
        </div>
      </div>
    </div>
  );
}
