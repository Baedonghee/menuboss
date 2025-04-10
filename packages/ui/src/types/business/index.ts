interface Phone {
  country: string;
  calling: string;
  phone: string;
}

export interface IBusinessMember {
  memberId: number;
  email: string;
  name: string;
  phone: Phone;
  role: {
    name: string;
  };
  createdDate: string;
  updatedDate: string;
}

export interface IBusinessRolePermission {
  group: string;
  types: ('Read' | 'Create' | 'Delete' | 'Edit')[];
}

export interface IBusinessRole {
  name: string;
  roleId: number;
  updatedDate: string;
  permissions: IBusinessRolePermission[];
}

export interface IBusinessMemberForm {
  email: string;
  name: string;
  password: string;
  country: string;
  phone: string;
  roleId: number;
}

export interface IBusinessRoleCheckList {
  name: string;
  nameValue: string;
  types: {
    name: 'Read' | 'Create' | 'Delete' | 'Edit';
    checked: boolean;
  }[];
}

export interface IBusinessRoleCheckKoList {
  name: string;
  nameValue: string;
  types: {
    name: '보기' | '등록' | '삭제' | '수정';
    value: 'Read' | 'Create' | 'Delete' | 'Edit';
    checked: boolean;
  }[];
}

export interface IBusinessRoleForm {
  name: string;
  permissions: IBusinessRolePermission[];
}

export interface IBusinessAddressForm {
  country: string;
  state?: string;
  city: string;
  line1: string;
  line2?: string;
  postalCode: string;
  phone: string;
}
