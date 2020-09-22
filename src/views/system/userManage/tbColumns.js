export default [
  {
    type: 'selection',
    width: 60,
    align: 'center',
    fixed: 'left'
  },
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '用户名',
    key: 'username',
    width: 150,
    sortable: true
  },
  {
    title: '真实姓名',
    key: 'realname',
    minWidth: 180,
    sortable: true
  },
  {
    title: '邮箱',
    key: 'email',
    minWidth: 180,
    sortable: true
  },
  {
    title: '角色',
    key: 'roles',
    minWidth: 120,
    sortable: true,
    render: (h, params) => {
      let rolestr = ' '
      if (params.row.roles.length > 0) {
        params.row.roles.forEach(item => {
          rolestr += item + ','
        })
        rolestr = rolestr.substring(0, rolestr.length - 1)
        return h('div', rolestr)
      } else {
        return h('div', rolestr)
      }
    }
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 120,
    render: (h, params) => {
      if (params.row.status === 0) {
        return h('div', [
          h('Badge', {
            props: {
              status: 'success',
              text: '正常启用'
            }
          })
        ])
      } else if (params.row.status === -1) {
        return h('div', [
          h('Badge', {
            props: {
              status: 'error',
              text: '禁用'
            }
          })
        ])
      }
    },
    filters: [
      {
        label: '正常启用',
        value: 0
      },
      {
        label: '禁用',
        value: -1
      }
    ],
    filterMultiple: false,
    filterMethod(value, row) {
      if (value === 0) {
        return row.status === 0
      } else if (value === -1) {
        return row.status === -1
      }
    }
  },
  {
    title: '创建时间',
    key: 'createTime',
    minWidth: 180,
    sortable: true
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    handle: ['edit', 'delete'],
    width: 230
  }
]
