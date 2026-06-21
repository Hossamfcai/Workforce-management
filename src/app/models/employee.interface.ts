export interface Employees {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Terminated'; // Using a union type for strict status checks
  dateJoined: string;
}
