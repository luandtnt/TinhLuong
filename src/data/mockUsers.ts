export interface MockUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: 'supervisor' | 'subordinate';
  organization: string;
}

export const mockUsers: MockUser[] = [
  // Lãnh đạo (Supervisor)
  {
    id: 'user-001',
    username: 'lanhdao1',
    password: '123456',
    fullName: 'Nguyễn Văn A',
    email: 'lanhdao1@example.com',
    role: 'supervisor',
    organization: 'Ban Tuyên giáo Tỉnh ủy',
  },
  {
    id: 'user-002',
    username: 'lanhdao2',
    password: '123456',
    fullName: 'Trần Thị B',
    email: 'lanhdao2@example.com',
    role: 'supervisor',
    organization: 'Văn phòng Tỉnh ủy',
  },
  
  // Chuyên viên (Subordinate)
  {
    id: 'user-003',
    username: 'chuyenvien1',
    password: '123456',
    fullName: 'Lê Văn C',
    email: 'chuyenvien1@example.com',
    role: 'subordinate',
    organization: 'Phòng Tuyên giáo',
  },
  {
    id: 'user-004',
    username: 'chuyenvien2',
    password: '123456',
    fullName: 'Phạm Thị D',
    email: 'chuyenvien2@example.com',
    role: 'subordinate',
    organization: 'Phòng Văn thư',
  },
  {
    id: 'user-005',
    username: 'chuyenvien3',
    password: '123456',
    fullName: 'Hoàng Văn E',
    email: 'chuyenvien3@example.com',
    role: 'subordinate',
    organization: 'Phòng Nghiên cứu',
  },
];

export function authenticateUser(username: string, password: string): MockUser | null {
  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
}

export function getUserById(id: string): MockUser | null {
  return mockUsers.find((u) => u.id === id) || null;
}
