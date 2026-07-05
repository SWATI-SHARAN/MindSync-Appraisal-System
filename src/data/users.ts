import type { User } from '@/types';

// ============================================================
// DEMO CREDENTIALS
// employee       : emp001@hpcl.in / Employee@123
// reporting_officer: ro001@hpcl.in  / Manager@123
// reviewing_officer: rev001@hpcl.in  / Reviewer@123
// internal_customer: ic001@hpcl.in   / Customer@123
// hr_admin       : hr001@hpcl.in   / HRAdmin@123
// senior_leadership: sl001@hpcl.in  / Leader@123
// ============================================================

export const demoCredentials: Record<string, { password: string; userId: string }> = {
  'emp001@hpcl.in':  { password: 'Employee@123', userId: 'usr-emp-001' },
  'ro001@hpcl.in':   { password: 'Manager@123',  userId: 'usr-ro-001' },
  'rev001@hpcl.in':  { password: 'Reviewer@123', userId: 'usr-rev-001' },
  'ic001@hpcl.in':   { password: 'Customer@123', userId: 'usr-ic-001' },
  'hr001@hpcl.in':   { password: 'HRAdmin@123',  userId: 'usr-hr-001' },
  'sl001@hpcl.in':   { password: 'Leader@123',   userId: 'usr-sl-001' },
};

const firstNames = [
  'Rajendra', 'Priya', 'Vikram', 'Suresh', 'Meena', 'Ajay', 'Ravi', 'Deepak',
  'Anita', 'Sanjay', 'Kavita', 'Rohit', 'Brijesh', 'Smita', 'Kiran', 'Ashok',
  'Nandini', 'Pooja', 'Sameer', 'Lalita', 'Arun', 'Divya', 'Ramesh', 'Sunita',
  'Manoj', 'Rekha', 'Vinod', 'Usha', 'Prakash', 'Geeta', 'Shankar', 'Mala',
  'Dinesh', 'Lata', 'Sunil', 'Asha', 'Harish', 'Neha', 'Girish', 'Seema',
  'Rajan', 'Preeti', 'Mohan', 'Leela', 'Babu', 'Radha', 'Sridhar', 'Kamala',
  'Arvind', 'Sarla', 'Nagesh', 'Jyoti', 'Kewal', 'Savita', 'Trilok', 'Shanti',
  'Hemant', 'Poonam', 'Kapil', 'Shobha', 'Anil', 'Vandana', 'Ramakant', 'Kaveri',
];
const lastNames = [
  'Singh', 'Sharma', 'Nair', 'Pillai', 'Krishnan', 'Verma', 'Tiwari', 'Mehta',
  'Desai', 'Kumar', 'Rao', 'Joshi', 'Yadav', 'Patil', 'Malhotra', 'Gupta',
  'Iyer', 'Agarwal', 'Bose', 'Nambiar', 'Mishra', 'Pandey', 'Chauhan', 'Srivastava',
  'Dwivedi', 'Tripathi', 'Shukla', 'Bajpai', 'Chaturvedi', 'Saxena', 'Dixit', 'Khanna',
  'Patel', 'Shah', 'Modi', 'Trivedi', 'Bhatt', 'Vora', 'Parekh', 'Mehta',
  'Reddy', 'Naidu', 'Raju', 'Babu', 'Murthy', 'Swamy', 'Prasad', 'Goud',
];
const grades = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'];
const locations = ['Mumbai', 'Delhi', 'Kolkata', 'Chennai', 'Bangalore', 'Ahmedabad', 'Pune', 'Noida', 'Hyderabad', 'Kochi'];
const deptIds = Array.from({ length: 20 }, (_, i) => `dept-${String(i + 1).padStart(2, '0')}`);
const deptNames = [
  'Refinery Operations', 'Marketing & Sales', 'Information Technology', 'Finance & Accounts',
  'Human Resources', 'Supply Chain & Logistics', 'Health Safety Environment', 'Projects & Engineering',
  'Corporate Strategy', 'LPG Operations', 'Research & Development', 'Legal & Compliance',
  'Pipeline Operations', 'Retail Network', 'Aviation Fuel Services', 'Procurement & Contracts',
  'Quality Assurance', 'Corporate Communications', 'Biofuels & Green Energy', 'Treasury & Risk Mgmt',
];
const designations = [
  'Engineer', 'Senior Engineer', 'Deputy Manager', 'Manager', 'Senior Manager',
  'DGM', 'GM', 'Chief Manager', 'Executive Engineer', 'Assistant Manager',
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateEmployee(index: number): User {
  const s = (offset: number) => seededRandom(index * 17 + offset);
  const fn = firstNames[Math.floor(s(1) * firstNames.length)];
  const ln = lastNames[Math.floor(s(2) * lastNames.length)];
  const name = `${fn} ${ln}`;
  const deptIndex = Math.floor(s(3) * 20);
  const deptId = deptIds[deptIndex];
  const deptName = deptNames[deptIndex];
  const gradeIndex = Math.floor(s(4) * grades.length);
  const grade = grades[gradeIndex];
  const locationIndex = Math.floor(s(5) * locations.length);
  const location = locations[locationIndex];
  const designation = designations[Math.floor(s(6) * designations.length)];
  const empNum = String(index + 1).padStart(4, '0');
  const joiningYear = 2010 + Math.floor(s(7) * 13);
  const joiningMonth = Math.floor(s(8) * 12) + 1;
  const managerIndex = Math.max(0, index - Math.floor(s(9) * 8) - 1);
  const managerId = `emp-${String(managerIndex + 1).padStart(3, '0')}`;

  return {
    id: `usr-emp-${empNum}`,
    employeeId: `HPCL${empNum}`,
    name,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${empNum}@hpcl.in`,
    role: 'employee',
    department: deptName,
    departmentId: deptId,
    grade,
    location,
    joiningDate: `${joiningYear}-${String(joiningMonth).padStart(2, '0')}-01`,
    managerId: index === 0 ? undefined : managerId,
    managerName: index === 0 ? undefined : firstNames[Math.floor(seededRandom(managerIndex * 17 + 1) * firstNames.length)] + ' ' + lastNames[Math.floor(seededRandom(managerIndex * 17 + 2) * lastNames.length)],
    reviewingOfficerId: `emp-${String(Math.max(1, managerIndex - 2)).padStart(3, '0')}`,
    designation,
    isActive: s(10) > 0.03,
  };
}

// Generate 500 employees
export const employees: User[] = Array.from({ length: 500 }, (_, i) => generateEmployee(i));

// Specific demo users with known credentials
export const demoUsers: User[] = [
  {
    id: 'usr-emp-001',
    employeeId: 'HPCL0001',
    name: 'Arjun Sharma',
    email: 'emp001@hpcl.in',
    role: 'employee',
    department: 'Information Technology',
    departmentId: 'dept-03',
    grade: 'E4',
    location: 'Mumbai',
    joiningDate: '2018-04-01',
    managerId: 'usr-ro-001',
    managerName: 'Vikram Nair',
    reviewingOfficerId: 'usr-rev-001',
    reviewingOfficerName: 'Suresh Pillai',
    designation: 'Deputy Manager',
    isActive: true,
  },
  {
    id: 'usr-ro-001',
    employeeId: 'HPCL0012',
    name: 'Vikram Nair',
    email: 'ro001@hpcl.in',
    role: 'reporting_officer',
    department: 'Information Technology',
    departmentId: 'dept-03',
    grade: 'E6',
    location: 'Mumbai',
    joiningDate: '2012-07-01',
    managerId: 'usr-rev-001',
    managerName: 'Suresh Pillai',
    designation: 'Senior Manager',
    isActive: true,
  },
  {
    id: 'usr-rev-001',
    employeeId: 'HPCL0025',
    name: 'Suresh Pillai',
    email: 'rev001@hpcl.in',
    role: 'reviewing_officer',
    department: 'Finance & Accounts',
    departmentId: 'dept-04',
    grade: 'E7',
    location: 'Mumbai',
    joiningDate: '2008-01-15',
    designation: 'DGM',
    isActive: true,
  },
  {
    id: 'usr-ic-001',
    employeeId: 'HPCL0040',
    name: 'Meena Krishnan',
    email: 'ic001@hpcl.in',
    role: 'internal_customer',
    department: 'Human Resources',
    departmentId: 'dept-05',
    grade: 'E5',
    location: 'Mumbai',
    joiningDate: '2015-09-01',
    designation: 'Manager',
    isActive: true,
  },
  {
    id: 'usr-hr-001',
    employeeId: 'HPCL0050',
    name: 'Priya Menon',
    email: 'hr001@hpcl.in',
    role: 'hr_admin',
    department: 'Human Resources',
    departmentId: 'dept-05',
    grade: 'E6',
    location: 'Mumbai',
    joiningDate: '2010-06-01',
    designation: 'Senior Manager - HR',
    isActive: true,
  },
  {
    id: 'usr-sl-001',
    employeeId: 'HPCL0005',
    name: 'Rajendra Singh',
    email: 'sl001@hpcl.in',
    role: 'senior_leadership',
    department: 'Corporate Strategy',
    departmentId: 'dept-09',
    grade: 'E8',
    location: 'Mumbai',
    joiningDate: '2000-03-01',
    designation: 'General Manager',
    isActive: true,
  },
];

export const allUsers: User[] = [...demoUsers, ...employees.slice(6)];
