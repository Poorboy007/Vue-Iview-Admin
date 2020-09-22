<template>
  <div>
    <div class="tb-noumenon">
      <Row>
        <Table :columns="tbConfig.columns" :loading="tbConfig.loading" :data="tbConfig.tableData" :no-data-text="noDataMsg"
               disabled-hover @on-sort-change="changeSort" @on-selection-change="showSelect">
        </Table>
      </Row>
    </div>
    <div class="tb-page">
      <Row type="flex" justify="center" class="page">
        <Col span="12">
        <div class="page-tip">总共：{{ tbConfig.total }} 条</div>
        </Col>
        <Col span="12" class="i-text-right">
        <Page :current="tbConfig.page.pageNumber" :page-size="tbConfig.page.pageSize" :page-size-opts="tbConfig.pageSizeOpts"
              show-sizer :total="tbConfig.page.listCount" prev-text="上一页" next-text="下一页" @on-change="changePage"
              @on-page-size-change="changePageSize"></Page>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TablePanel',
  props: {
    tbConfig: {
      type: Object,
      default() {
        return {
          pageSizeOpts: [10, 20, 50],
          total: 0,
          columns: [],
          tableData: [],
          page: {}
        }
      }
    }
  },
  data() {
    return {
      noDataMsg: ''
    }
  }, methods: {
    changeSort() {

    },
    showSelect() {

    },
    changePage() {

    },
    changePageSize() {

    }
  }
}
</script>

<style>
</style>
