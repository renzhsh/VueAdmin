import "ant-design-vue/dist/antd.css";
import { Button } from "ant-design-vue";

export default {
  install(Vue) {
    Vue.use(Button.name, Button);
  }
};
