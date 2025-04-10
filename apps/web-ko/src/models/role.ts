import { IBusinessRoleCheckKoList } from '@repo/ui/types';

export const settingRoleList = [
  {
    name: 'TV',
    nameValue: 'Screens',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  },
  {
    name: '시간표',
    nameValue: 'Schedules',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  },
  {
    name: '재생목록',
    nameValue: 'Playlists',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  },
  {
    name: '보관함',
    nameValue: 'Media',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  },
  {
    name: '캔버스',
    nameValue: 'Canvas',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  },
  {
    name: '구성원',
    nameValue: 'Users',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  },
  {
    name: '역할 설정',
    nameValue: 'Roles',
    types: [
      {
        name: '보기',
        value: 'Read',
        checked: true
      },
      {
        name: '등록',
        value: 'Create',
        checked: false
      },
      {
        name: '삭제',
        value: 'Delete',
        checked: false
      },
      {
        name: '수정',
        value: 'Edit',
        checked: false
      }
    ]
  }
] as IBusinessRoleCheckKoList[];
