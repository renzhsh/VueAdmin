import App from "./App.vue";
import SpringX from "rzs-spring";
import AntdUI from "@/plugins/antd";

const spring = new SpringX();

spring
  .use(AntdUI)
  .setup({
    el: "#app",
    render: h => h(App)
  });
