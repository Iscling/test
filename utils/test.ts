export class OrderConfirmParam {
  receiver_id?: number // 用户收货地址id,没有不填
  coupon_user_ids?: number[] // 优惠券id
  skus: OrderConfirmSku[] // 购买商品明细
  pay_type?: string // 支付方式
  type: string // group(拼团订单) or normal(订单) or presell(预售订单)
  remark?: string // 订单备注
  ignore_gift?: number // 不用管，不填
  mem_reward_id?: number // 不用管，不填
  tid?: string // 不填，自营禁止填，第三方订单填
  shop?: string // 不填
  static _ivy_validator: any = {
    skus: {
      required: true,
      type: 'array',
    },
    type: {
      required: true,
      ranges: {
        group: true,
        normal: true,
        presell: true
      }
    },
    pay_type: {
      required: true,
      default: 'wechat',
    },
    shop: {
      required: true,
      default: 'ivydad',
    },
  }
}
export class OrderConfirmSku {
  type: string // group_goods or goods
  id: number // skuId
  limit_buy?: number // 限时折扣活动id
  group?: GroupParam // 拼团参数
  presell?: PresellParam // 预售参数
  redemption_code?: string // 兑换码
  num: number // 商品数量
  ticket?: number
  static _ivy_validator: any = {
    type: {
      required: true,
      ranges: {
        group_goods: true,
        goods: true,
      }
    },
    id: { required: true },
    num: { required: true },
  }
}
export class GroupParam {
  activity_id: number // 活动id
  group_order_id: number // 参团必填，团长id
  action: string // 类型 参团开团
  static _ivy_validator: any = {
    activity_id: { required: true },
    action: {
      required: true,
      ranges: {
        join: true, // 参团
        create: true // 开团
      }
    },
  }
}

export class PresellParam {
  activity_id: number // 活动id
  presell_pay_type: string // 定金尾款
  static _ivy_calidator: any = {
    activity_id: { required: true },
    presell_pay_type: {
      required: true,
      ranges: {
        deposit: true, // 定金
        tail_money: true, // 尾款
      }
    }
  }
}


var arr = [[ { "name": "wechat", "brand": "wechat" }, { "name": "hwpay", "brand": "huawei" }, { "name": "mzpay", "brand": "meizu" }, { "name": "oppopay", "brand": "oppo" }], "coin" ]

// if (arr.indexOf('coin') !== -1) {
// 	let coin_index = arr.indexOf('coin')
//   arr.splice(coin_index, 1)
// }
let newArr = arr[0]
let wechatIndex = arr[0].findIndex(item => item.name === 'wechat')
newArr.splice(wechatIndex, 1)
console.log(newArr)

// diff
// 实际上就是对虚拟节点VNode的开始和结束位置进行标记，标记完之后进入while循环处理，对新老节点的比较并移动对应的VNode节点，循环过程中对新老节点的头尾进行比较寻找相同的节点，如果相同的节点满足可复用，则进行复用处理，并且根据具体的情形移动新老节点的索引，while循环的退出条件就是直到老节点或者新节点的开始位置大于结束位置
// 如果没有相同的节点可复用，通过事先建立好的以旧的VNode为key值，对应index序列为value值的哈希表
