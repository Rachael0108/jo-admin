import { reactive, ref} from 'vue'
import { resetObToPrimaryType } from '@/utils/tool'


/**
 * @description usePage 接收一个 opts 参数，返回列表所需数据
 * @param {Object} opts.searchForm - 默认查询参数
 * @param {Function} opts.getListApi  - 获取列表数据的接口
 * @param {Function} opts.customQueryParameters  - 自定义查询参数
 * @param {Function} opts.getListFunc  - 执行完 getList 成功后执行的逻辑 有一个opts参数
 * @param {Function} opts.resetFunc  - 执行完 reset 后执行的逻辑
 * @param {Function} opts.sizeChangeFunc  - 执行完 sizeChange 后执行的逻辑
 * @param {Function} opts.currentChangeFunc  - 执行完 currentChange 后执行的逻辑
 */
// usePage 是一段 管理后台列表的复用逻辑
export const usePage = (opts) => {
    const {
        searchForm = {},
        getListApi,
        customQueryParameters  = () => {},
        getListApiFunc = (opts) = {},
        resetFunc = () => {},
        sizeChangeFunc = () => {},
        currentChangeFunc = () => {}
    } = opts

const reset = () => {
    Object.assign(searchForm, resetObToPrimaryType(searchForm))  // Object.assign: 复制对象属性
    resetFunc()
    handleCurrentChange(1)
}
const page = reactive({
    pageSize: 10,
    pageNo: 1,
    total: 0
})
const tableData = ref([])
const getList = () => {
    // 请求参数
    const opts = {
        ...page,
        ...searchForm,
        ...customQueryParameters()
    }

    getListApi(opts).then((res)=>{
        if(res.code === 0) {
            tableData.value = res.data?.rows || []
            page.total = res.data?.total || 0
            getListFunc(opts)
        }
    })
}
const handleSizeChange = (size) => {
    page.pageSize = size
    sizeChangeFunc()
    getList()
}
const handleCurrentChange = (cur) => {
    page.pageNo = cur
    currentChangeFunc()
    getList()
}

// 暴露参数和方法
return {
        searchForm,
        reset,
        page,
        tableData,
        handleSizeChange,
        handleCurrentChange
    }
}
