<script>
import {reactive,ref,computed} from 'vue'
import {usePage} from '@/composables/usePage'
const searchForm = reactive({
  createEndTime: '',
  createStartTime: ''
})

const { reset, page, tableData, handleSizeChange, handleCurrentChange } = usePage({
  searchForm,
  // getListApi: testModel.getList   //封装的接口请求
})
</script>
