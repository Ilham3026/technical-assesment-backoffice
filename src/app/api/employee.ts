interface EmployeeStatus {
    label: string;
    value: string;
}

interface GroupStatus {
    label: string;
    value: string;
}
export interface Employee {
    id?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    birthDate?: number;
    basicSalary?: number;
    status?: EmployeeStatus;
    group?: GroupStatus;
    description?: string;
}