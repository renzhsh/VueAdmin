<template>
  <a-form-item :label="label" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-input
      v-if="type=='input'"
      :placeholder="placeholder"
      :read-only="readonly"
      :disabled="disabled"
      v-decorator="[name, { rules:rules }]"
    />
    <slot v-if="type=='slot'"></slot>
  </a-form-item>
</template>
<script>
export default {
  props: {
    label: String,
    labelCol: Object,
    wrapperCol: Object,
    name: {
      type: String,
      required: true
    },
    type: {
      // 'input'|'slot'
      type: String,
      default: "input"
    },
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    rules: Array // 校验规则
  }
};
</script>
