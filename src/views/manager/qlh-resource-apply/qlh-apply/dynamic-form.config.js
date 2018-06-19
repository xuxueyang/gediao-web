// 动态表单的单元配置
// 每一个都必须含有type字段1
export const FORM_ITEM_CONFIG = {
  'qlh-apply-105-ask': {
    type: 'qlh-apply-105-ask',
    description: '申请105团',
    items: [
      {
        type: 'input-textarea',
        name: '申请人'
      },
      {
        type: 'input-textarea',
        name: '申请备注'
      },
      {
        type: 'input-textarea',
        name: '战力说明'
      },
      {
        type: 'input-textarea',
        name: '时间'
      }
    ]
  }
}