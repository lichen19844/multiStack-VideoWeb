import { AxiosInstance } from "axios";

declare module 'vue/types/vue' {
  // 声明为 Vue 补充的东西
  interface Vue {
    $http: AxiosInstance
  }
}

// declare module 'vue-ele-form' {
//   export const install: () => any
// }