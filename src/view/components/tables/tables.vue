<template>
  <div>
    <Card>
      <Row :gutter="10">
        <Col span="4">
          <Input v-model="name">
            <strong slot="prepend">Name</strong>
          </Input>
        </Col>
        <Col span="4">
          <Input v-model="age">
          <strong slot="prepend">Age</strong>
          </Input>
        </Col>
        <Col span="4">
          <Input v-model="address">
            <strong slot="prepend">Address</strong>
          </Input>
        </Col>
        <Col span="5" push="9">
          <Button type="primary">查询</Button>
          <Button type="success" @click="item={};isEdit=true;isAdd=true;isShowModel=true" style="margin-left: 10px">新增</Button>
        </Col>
      </Row>
      <br>
      <Table :loading="loading" border :columns="columns" :data="data">
      </Table>
      <Row style="margin-top: 10px" type="flex" justify="end">
        <Page :total="total" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-sizer />
      </Row>
    </Card>
    <Modal
      v-model="isShowModel"
      title="查看/编辑/新增">
      <Form :model="item" label-position="left" :label-width="100">
        <form-item label="Name">
          <Input v-model="item.name" :disabled=!this.isEdit></Input>
        </form-item>
        <form-item label="Age">
          <Input v-model="item.age" :disabled=!isEdit></Input>
        </form-item>
        <form-item label="Address">
          <Input v-model="item.address"  :disabled=!isEdit></Input>
        </form-item>
      </Form>
      <div slot="footer">
        <Button v-if="!isEdit" type="info" size="large"  @click="isEdit = true">编辑</Button>
        <Button v-if="isAdd" type="info" size="large"  @click="addData()">新增</Button>
        <Button v-if="isEdit && !isAdd" type="error" size="large" @click="updateData">保存</Button>
        <Button type="success" size="large" @click="isShowModel=false;isEdit=false;isAdd=false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
  },
  data () {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      index: -1,
      isEdit: false,
      isAdd: false,
      isShowModel: false,
      item: {
        name: '',
        age: '',
        address: ''
      },
      loading: false,
      name: '',
      age: '',
      address: '',
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'

                },
                style: {
                  'margin-right': '5px'
                },
                on: {
                  click: () => this.show(params.index)
                }
              }, '查看'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定要删除吗?',
                  'word-wrap': true
                },
                on: {
                  'on-ok': () => this.remove(params.index)
                }
              }, [h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  'margin-right': '15px'
                }
              }, '删除')]
              )
            ])
          }
        }
      ],
      data: [
      ]
    }
  },
  methods: {
    changePageSize (pageSize) {
      this.pageSize = pageSize
      this.loadData()
    },
    changePage (pageNo) {
      this.pageNo = pageNo
      this.loadData()
    },
    show (index) {
      this.index = index
      this.isShowModel = true
      this.isEdit = false
      this.item = Object.assign({}, this.data[index])
    },
    updateData () {
      this.isEdit = false
      this.isShowModel = false
      this.item = {}
      // updateData
    },
    addData () {
      this.isEdit = true
    },
    remove (index) {
      this.data.splice(index, 1)
    },
    loadData () {
      getTableData({ pageSize: this.pageSize, pageNo: this.pageNo }).then(res => {
        this.data = res.data.data
        this.total = res.data.count
      })
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="less">
</style>
