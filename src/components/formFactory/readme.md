# formFactory

通过配置的形式实现表单的布局、配置以及数据验证，可以有效解决以往编码过程中大数据量的属性绑定问题。

## API

### 属性

#### FormFactory
参数|说明|类型|默认值
-|-|-|-
layout|表单布局，和 [Form](https://www.antdv.com/components/form-cn/)一致|`'horizontal','vertical','inline'`|`'horizontal'`
layoutGrid|`'horizontal'`布局下，一行内有多个表单域的栅格配置。|`Object`|
labelCol|属性`labelCol`和`wrapperCol`用于设置表单域的label和输入控件的布局。具体含义和用法参考[Form.Item](https://www.antdv.com/components/form-cn/#Form.Item)|`Object`|
wrapperCol||`Object`|
items|表单域的配置|`Array`|
enableScroll|校验完后，如果校验不通过的菜单域不在可见范围内，是否自动滚动进可见范围|`Boolean`|`true`
customValidator|自定义表单验证逻辑。可以通过事件submit和对象form来验证|`Boolean`|`false`
submitText|`submit`按钮的文本|`String`|`提交`


#### layoutGrid
在水平排列的布局下，提供了一行内有多个表单域的布局形式，参考[高级搜索](https://www.antdv.com/components/form-cn/#components-form-demo-advanced-search).

此时通过属性`layoutGrid`进行配置：
属性`layoutGrid`的含义和取值参考[Grid](https://www.antdv.com/components/grid-cn/#api)
```json
    {
        row: {
          align: "top",
          gutter: 0,
          justify: "start",
          type: undefined
        },
        col: {
          offset: 0,
          order: 0,
          pull: 0,
          push: 0,
          span: undefined,
          xs: undefined,
          sm: undefined,
          md: undefined,
          lg: undefined,
          xl: undefined,
          xxl: undefined
        }
    }
```

#### Items
参数|说明|类型|默认值
-|-|-|-
label|label标题|`String`|
labelCol|同`FormFactory.labelCol`|`Object`|
wrapperCol|同`FormFactory.wrapperCol`|`Object`|
name|输入控件绑定值(`v-model`)的名称, __必填项__ |`String`|
type|输入控件的类型。本组件只提供了`input`,如果要使用其他控件，请设置`type=slot`并自定义输入控件|`'input','slot'`|`input`
placeholder|placeholder|`String`|
readonly|placeholder|`Boolean`|`false`
disabled|disabled|`Boolean`|`false`
default|输入控件的初始值||
required|是否是必填项|`Boolean`|`false`
message|`required`的校验文案|`String`|`必填项`
rules|校验规则|`Array`|

### Slot

slot|说明
-|-
submit|提交按钮的表单域
`name`-slot|当`item.type`为`slot`时，自动生成名为`'name'-slot`的slot。在这里自定义输入控件

### 事件

事件名称|说明|回调函数
-|-|-
submit|表单提交时的回调|`(form)=>{}`
validating|数据验证的回调事件，无论成功与否|`(errs,values)=>{}`
fieldsChange|表单域的值发生改变时的回调|`(fields,values)=>{}`

### 方法

方法|说明|类型
-|-|-
submit|表单提交|`function()`
getFieldsValue|获取一组输入控件的值，如不传入参数，则获取全部组件的值|`function([fieldNames: string[]])`
getFieldValue|获取一个输入控件的值|`Function(fieldName: string)`
setFieldsValue|设置一组输入控件的值|`Function({[fieldName]: value})`
resetFields|重置一组输入控件的值与状态，如不传入参数，则重置所有组件|`Function([names: string[]])`

更多方法，请使用属性`form`.

## 示例

### 水平布局

```html
<FormFactory layout="inline"  :items="items" submitText='登录'>
</FormFactory>
```
```js
items = [
  {
    label:'用户名',
    name:'username',
    required:true
  },
  {
    label:'密码',
    name:'password',
    required:true
  }
]
```

### 自定义组件
```html
<FormFactory :labelCol="labelCol" :wrapperCol="wrapperCol" :items="items">
  <a-select
    slot="gender-slot"
    slot-scope="scope"
    placeholder="Select a option and change input text above"
    v-decorator="['gender', { rules: scope.rules }]"
  >
    <a-select-option value="male">male</a-select-option>
    <a-select-option value="female">female</a-select-option>
  </a-select>
  <a-button slot="submit" type="primary" html-type="submit">Submit</a-button>
</FormFactory>
```
```js
data(){
  return {
    labelCol:{
      span:5
    },
    wrapperCol:{
      span:12
    },
    items:[{
      label:'Gender',
      name:'gender',
      type:'slot',
      default:'female',
      rules:[{
        required: true,
        type: "enum",
        enum: ["male", "female"]
      }]
    },{
      label:'Label1',
      name:'name1',
      required:true
    },{
      label:'Label2',
      name:'name2'
    }]
  }
}
```


## 高级验证

 参考 [validator](https://github.com/yiminghe/async-validator) 
