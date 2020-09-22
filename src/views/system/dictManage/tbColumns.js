export default [
  // 表头
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    type: 'index',
    width: 60,
    align: 'center'
  },
  {
    title: '名称',
    key: 'title',
    minWidth: 150,
    sortable: true
  },
  {
    title: '数据值',
    key: 'value',
    width: 150,
    sortable: true
  },
  {
    title: '备注',
    key: 'description',
    width: 150,
    sortable: true
  },
  {
    title: '排序值',
    key: 'sortOrder',
    width: 100,
    sortable: true,
    sortType: 'asc'
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    width: 130,
    render: (h, params) => {
      let re = ''
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
    }
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 250,
    sortable: true
  },
  {
    title: '操作',
    key: 'action',
    width: 180,
    align: 'center',
    handle: ['editDictData', 'deleteDictData'],
    fixed: 'right'
  }
]
