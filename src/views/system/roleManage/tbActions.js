export const menuRole = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      props: {
        type: 'warning',
        size: 'small',
        placement: 'top',
        loading: currentRow.isOpenMenuRoleing
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.editPermission.form = {}
          vm.$set(currentRow, 'isOpenMenuRoleing', true)
          vm.editPermission.form = currentRow
          vm.editPermission.show = true
        }
      }
    },
    '菜单权限'
  )
}

export const editRole = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      props: {
        size: 'small'
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.editData.form = {}
          vm.editData.modalType = '2'
          vm.editData.form = currentRow
          vm.editData.show = true
        }
      }
    },
    '编辑'
  )
}

export const delRole = (vm, h, currentRow, index) => {
  return h('Poptip', {
    props: {
      confirm: true,
      title: '您确定要删除这条数据吗? ',
      transfer: true
    },
    on: {
      'on-ok': () => {
        vm.$set(currentRow, 'isDeleting', true)
        vm.delete(currentRow)
      }
    }
  }, [
    h('Button', {
      style: {
        margin: '0 5px'
      },
      props: {
        type: 'error',
        size: 'small',
        placement: 'top',
        loading: currentRow.isDeleting
      }
    }, '删除')
  ])
}
