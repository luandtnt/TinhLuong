/**
 * Common Icons
 * Các icon thường dùng trong hệ thống
 */

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Add Icon (Thêm mới)
export function AddIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 4V16M4 10H16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Edit Icon (Chỉnh sửa)
export function EditIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80969 15.8327 1.80969C16.1422 1.80969 16.4487 1.87061 16.7347 1.98906C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55064 18.1897 3.85714 18.1897 4.16667C18.1897 4.47619 18.1287 4.78269 18.0103 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Delete Icon (Xóa)
export function DeleteIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 5H4.16667H17.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 5.00016V3.3335C6.66602 2.89147 6.84161 2.46754 7.15417 2.15498C7.46673 1.84242 7.89065 1.66683 8.33268 1.66683H11.666C12.108 1.66683 12.532 1.84242 12.8445 2.15498C13.1571 2.46754 13.3327 2.89147 13.3327 3.3335V5.00016M15.8327 5.00016V16.6668C15.8327 17.1089 15.6571 17.5328 15.3445 17.8454C15.032 18.1579 14.608 18.3335 14.166 18.3335H5.83268C5.39065 18.3335 4.96673 18.1579 4.65417 17.8454C4.34161 17.5328 4.16602 17.1089 4.16602 16.6668V5.00016H15.8327Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// View Icon (Xem)
export function ViewIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.833984 10C0.833984 10 4.16732 3.33334 10.0007 3.33334C15.834 3.33334 19.1673 10 19.1673 10C19.1673 10 15.834 16.6667 10.0007 16.6667C4.16732 16.6667 0.833984 10 0.833984 10Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Refresh Icon (Làm mới)
export function RefreshIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 2.5V7.5H12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 17.5V12.5H7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 7.5C4.73835 6.1195 5.5969 4.89549 6.73979 3.96643C7.88268 3.03737 9.26414 2.43747 10.7309 2.23319C12.1977 2.02891 13.6923 2.22794 15.0548 2.80897C16.4173 3.39 17.5972 4.33353 18.4667 5.53333L17.5 7.5M2.5 12.5L3.46667 10.5333C4.33616 11.7331 5.51605 12.6766 6.87854 13.2577C8.24103 13.8387 9.73565 14.0377 11.2024 13.8334C12.6692 13.6292 14.0507 13.0293 15.1936 12.1002C16.3365 11.1711 17.195 9.94711 17.6833 8.56667"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Search Icon (Tìm kiếm)
export function SearchIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5L13.875 13.875"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Download Icon (Tải xuống)
export function DownloadIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83398 8.33334L10.0007 12.5L14.1673 8.33334"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5V2.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Upload Icon (Tải lên)
export function UploadIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1673 6.66666L10.0007 2.5L5.83398 6.66666"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 2.5V12.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Close Icon (Đóng)
export function CloseIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 5L5 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L15 15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Check Icon (Xác nhận)
export function CheckIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.6667 5L7.50004 14.1667L3.33337 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ChevronDown Icon (Mũi tên xuống)
export function ChevronDownIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ChevronRight Icon (Mũi tên phải)
export function ChevronRightIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Menu Icon (Hamburger menu)
export function MenuIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 10H17.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 5H17.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 15H17.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Filter Icon (Lọc)
export function FilterIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M17.5 2.5H2.5L8.33333 9.39167V14.1667L11.6667 15.8333V9.39167L17.5 2.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Settings Icon (Cài đặt)
export function SettingsIcon({ size = 20, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1667 12.5C16.0557 12.7513 16.0226 13.0301 16.0717 13.3006C16.1209 13.5711 16.2501 13.8203 16.4417 14.0167L16.4917 14.0667C16.6461 14.221 16.7687 14.4046 16.8527 14.6068C16.9368 14.809 16.9806 15.0259 16.9806 15.2448C16.9806 15.4638 16.9368 15.6807 16.8527 15.8829C16.7687 16.0851 16.6461 16.2687 16.4917 16.423C16.3373 16.5774 16.1537 16.7 15.9515 16.7841C15.7493 16.8681 15.5324 16.9119 15.3135 16.9119C15.0946 16.9119 14.8777 16.8681 14.6755 16.7841C14.4733 16.7 14.2897 16.5774 14.1353 16.423L14.0853 16.373C13.889 16.1814 13.6398 16.0522 13.3693 16.003C13.0988 15.9539 12.82 15.987 12.5687 16.098C12.3213 16.2041 12.1113 16.3826 11.9663 16.6113C11.8213 16.84 11.7478 17.1085 11.7557 17.3807V17.5C11.7557 17.942 11.5801 18.366 11.2675 18.6785C10.955 18.9911 10.531 19.1667 10.089 19.1667C9.64698 19.1667 9.22305 18.9911 8.91049 18.6785C8.59793 18.366 8.42234 17.942 8.42234 17.5V17.425C8.42234 17.1441 8.33234 16.8706 8.16534 16.6446C7.99834 16.4186 7.76234 16.2521 7.49234 16.1697C7.24101 16.0587 6.96218 16.0256 6.69168 16.0747C6.42118 16.1239 6.17201 16.2531 5.97568 16.4447L5.92568 16.4947C5.77131 16.6491 5.58768 16.7717 5.38548 16.8557C5.18328 16.9398 4.96638 16.9836 4.74745 16.9836C4.52851 16.9836 4.31161 16.9398 4.10941 16.8557C3.90721 16.7717 3.72358 16.6491 3.56921 16.4947C3.41481 16.3403 3.29221 16.1567 3.20816 15.9545C3.12411 15.7523 3.08031 15.5354 3.08031 15.3165C3.08031 15.0975 3.12411 14.8806 3.20816 14.6784C3.29221 14.4762 3.41481 14.2926 3.56921 14.1382L3.61921 14.0882C3.81081 13.8919 3.93998 13.6427 3.98913 13.3722C4.03828 13.1017 4.00518 12.8229 3.89401 12.5715C3.78793 12.3241 3.60943 12.1141 3.38073 11.9691C3.15203 11.8241 2.88353 11.7506 2.61134 11.7585H2.50068C2.05865 11.7585 1.63472 11.5829 1.32216 11.2703C1.0096 10.9578 0.834015 10.5338 0.834015 10.0918C0.834015 9.64978 1.0096 9.22585 1.32216 8.91329C1.63472 8.60073 2.05865 8.42514 2.50068 8.42514H2.57568C2.85658 8.42514 3.13008 8.33514 3.35608 8.16814C3.58208 8.00114 3.74858 7.76514 3.83101 7.49514C3.94218 7.24381 3.97528 6.96498 3.92613 6.69448C3.87698 6.42398 3.74781 6.17481 3.55621 5.97848L3.50621 5.92848C3.35181 5.77411 3.22921 5.59048 3.14516 5.38828C3.06111 5.18608 3.01731 4.96918 3.01731 4.75024C3.01731 4.53131 3.06111 4.31441 3.14516 4.11221C3.22921 3.91001 3.35181 3.72638 3.50621 3.57201C3.66058 3.41761 3.84421 3.29501 4.04641 3.21096C4.24861 3.12691 4.46551 3.08311 4.68445 3.08311C4.90338 3.08311 5.12028 3.12691 5.32248 3.21096C5.52468 3.29501 5.70831 3.41761 5.86268 3.57201L5.91268 3.62201C6.10901 3.81361 6.35818 3.94278 6.62868 3.99193C6.89918 4.04108 7.17801 4.00798 7.42934 3.89681H7.50068C7.74808 3.79073 7.95808 3.61223 8.10308 3.38353C8.24808 3.15483 8.32158 2.88633 8.31368 2.61414V2.50348C8.31368 2.06145 8.48926 1.63752 8.80182 1.32496C9.11438 1.0124 9.53831 0.836815 9.98034 0.836815C10.4224 0.836815 10.8463 1.0124 11.1589 1.32496C11.4714 1.63752 11.647 2.06145 11.647 2.50348V2.57848C11.6391 2.85068 11.7126 3.11918 11.8576 3.34788C12.0026 3.57658 12.2126 3.75508 12.46 3.86115C12.7113 3.97231 12.9902 4.00541 13.2607 3.95626C13.5312 3.90711 13.7803 3.77795 13.9767 3.58635L14.0267 3.53635C14.181 3.38195 14.3647 3.25935 14.5669 3.1753C14.7691 3.09125 14.986 3.04745 15.2049 3.04745C15.4238 3.04745 15.6407 3.09125 15.8429 3.1753C16.0451 3.25935 16.2288 3.38195 16.3831 3.53635C16.5375 3.69071 16.6601 3.87435 16.7442 4.07655C16.8282 4.27875 16.872 4.49565 16.872 4.71458C16.872 4.93351 16.8282 5.15041 16.7442 5.35261C16.6601 5.55481 16.5375 5.73845 16.3831 5.89281L16.3331 5.94281C16.1415 6.13915 16.0123 6.38831 15.9632 6.65881C15.914 6.92931 15.9471 7.20815 16.0583 7.45948V7.53081C16.1644 7.77821 16.3429 7.98821 16.5716 8.13321C16.8003 8.27821 17.0688 8.35171 17.341 8.34381H17.4517C17.8937 8.34381 18.3176 8.5194 18.6302 8.83196C18.9427 9.14452 19.1183 9.56845 19.1183 10.0105C19.1183 10.4525 18.9427 10.8764 18.6302 11.189C18.3176 11.5016 17.8937 11.6771 17.4517 11.6771H17.3767C17.1045 11.6692 16.836 11.7427 16.6073 11.8877C16.3786 12.0327 16.2001 12.2427 16.094 12.4901V12.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
