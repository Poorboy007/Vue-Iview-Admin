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
    title: '角色名称',
    key: 'name',
    width: 150,
    sortable: true
  },
  {
    title: '备注',
    key: 'description',
    minWidth: 150,
    sortable: true
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 170,
    sortable: true,
    sortType: 'desc'
  },
  {
    title: '更新时间',
    key: 'updateTime',
    width: 170,
    sortable: true
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    handle: ['menuRole', 'editRole', 'delRole'],
    width: 250
  }
]
