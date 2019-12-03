<template>
  <a-form :form="form" :layout="layout" @submit="handleSubmit">
    <a-row
      v-if="layout=='horizontal'"
      :align="grid.row.align"
      :gutter="grid.row.gutter"
      :justify="grid.row.justify"
      :type="grid.row.type"
    >
      <a-col
        v-for="(item,index) in items"
        :key="index"
        :offset="grid.col.offset"
        :order="grid.col.order"
        :pull="grid.col.pull"
        :push="grid.col.push"
        :span="grid.col.span"
        :xs="grid.col.xs"
        :sm="grid.col.sm"
        :md="grid.col.md"
        :lg="grid.col.lg"
        :xl="grid.col.xl"
        :xxl="grid.col.xxl"
      >
        <ItemCreator
          :label-col="item.labelCol?item.labelCol:labelCol"
          :wrapper-col="item.wrapperCol?item.wrapperCol:wrapperCol"
          :type="item.type"
          :label="item.label"
          :name="item.name"
          :placeholder="item.placeholder"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :rules="makeRules(item)"
        >
          <slot :name="item.name + '-slot'" :item="item" :rules="makeRules(item)"></slot>
        </ItemCreator>
      </a-col>
    </a-row>
    <template v-else v-for="(item,index) in items">
      <ItemCreator
        :key="index"
        :label-col="item.labelCol?item.labelCol:labelCol"
        :wrapper-col="item.wrapperCol?item.wrapperCol:wrapperCol"
        :type="item.type"
        :label="item.label"
        :name="item.name"
        :placeholder="item.placeholder"
        :readonly="item.readonly"
        :disabled="item.disabled"
        :rules="makeRules(item)"
      >
        <slot :name="item.name + '-slot'" :item="item" :rules="makeRules(item)"></slot>
      </ItemCreator>
    </template>
    <slot name="submit">
      <a-form-item :wrapper-col="wrapperCol">
        <a-button type="primary" html-type="submit">{{submitText}}</a-button>
      </a-form-item>
    </slot>
  </a-form>
</template>
<script>
/**
 * 事件
 * @ submit 表单提交时的回调
 * @ validating 数据验证的回调事件，无论成功与否 Function(errs, values)
 * @ fieldsChange 表单域的值发生改变时的回调  Function(fields, values)
 */
import ItemCreator from "./itemCreator";
import GridMixin from "./gridMixin";
export default {
  components: { ItemCreator },
  mixins: [GridMixin],
  props: {
    layout: {
      // 'horizontal'|'vertical'|'inline'
      type: String,
      default: "horizontal"
    },
    layoutGrid: Object, // horizontal下的布局栅格
    labelCol: Object,
    wrapperCol: Object,
    items: Array,
    enableScroll: {
      // 校验完后，如果校验不通过的菜单域不在可见范围内，是否自动滚动进可见范围
      type: Boolean,
      default: true
    },
    customValidator: {
      // 自定义表单验证逻辑。可以通过事件submit和对象form来验证
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: "提交"
    }
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: "coordinated",
        onFieldsChange: (props, fields) => {
          this.$emit("fieldsChange", fields, this.getFieldsValue());
        }
      })
    };
  },
  mounted() {
    // 赋初始值
    var fieldsValue = this.items
      .filter(item => item.default)
      .map(item => {
        return {
          [item.name]: item.default
        };
      });
    this.setFieldsValue(Object.assign({}, ...fieldsValue));
  },
  methods: {
    submit() {
      this.form.submit();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$emit("submit", this.form);
      if (this.customValidator) return;

      var validating = this.enableScroll
        ? this.form.validateFieldsAndScroll
        : this.form.validateFields;
      validating((err, values) => {
        this.$emit("validating", err, values);
      });
    },
    getFieldsValue(options) {
      return this.form.getFieldsValue(options);
    },
    getFieldValue(name) {
      return this.form.getFieldValue(name);
    },
    setFieldsValue(options) {
      this.$nextTick(() => {
        this.form.setFieldsValue(options);
      });
    },
    resetFields(options) {
      this.form.resetFields(options);
    },
    makeRules(item) {
      var rules = [];

      if (item.required != undefined) {
        rules.push({
          required: item.required,
          message: item.message ? item.message : `必填项`
        });
      }

      if (Array.isArray(item.rules)) {
        rules = [...rules, ...item.rules];
      }

      return rules;
    }
  }
};
</script>