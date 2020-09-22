export const roleButton = (vm, h, currentRow, index) => {
  return h('Button', {
    props: {
      type: 'primary',
      size: 'small'
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        vm.roleModalSetting.id = currentRow.id
        vm.roleModalSetting.show = true
        vm.getRoleListForUser()
      }
    }
  }, '分配角色')
}

export const editButton = (vm, h, currentRow, index) => {
  return h('Button', {
    props: {
      type: 'primary',
      size: 'small'
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        vm.editData.form = {}
        vm.editData.modalType = '2'
        vm.editData.form = Object.assign({}, currentRow)
        vm.editData.show = true
      }
    }
  }, '编辑')
}

export const deleteButton = (vm, h, currentRow, index) => {
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

