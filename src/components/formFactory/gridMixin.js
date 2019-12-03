export default {
  computed: {
    grid() {
      // 默认值
      var defaultGrid = {
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
      };

      if (this.layout == "vertical" || this.layout == "inline") {
        return defaultGrid;
      } else {
        return Object.assign({}, defaultGrid, this.layoutGrid);
      }
    }
  }
};
