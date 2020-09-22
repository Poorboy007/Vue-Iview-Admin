export const editDictData = (vm, h, currentRow, index) => {
  return h(
    'Button',
    {
      props: {
        type: 'primary',
        size: 'small'
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.editDictData.form = {}
          vm.editDictData.modalType = '2'
          vm.editDictData.form = Object.assign({}, currentRow)
          vm.editDictData.show = true
          // this.edit(params.row)
        }
      }
    },
    '编辑'
  )
}

export const deleteDictData = (vm, h, currentRow, index) => {
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
