import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'

const Random = Mock.Random

let tableData = []
for (let i = 0; i < 1000; i++) {
  tableData.push({
    name: 'name ' + i,
    age: i,
    address: 'address' + i
  })
}

export const getTableData = req => {
  let { pageSize, pageNo } = JSON.parse(req.body)
  let startIndex = pageSize * (pageNo - 1)
  let res = {
    data: tableData.slice(startIndex, startIndex + pageSize),
    count: tableData.length
  }
  window.console.log(res)
  return res
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}
