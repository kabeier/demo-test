import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ipt2zy',
  allowCypressEnv: false,

  e2e: {
    baseUrl:"http://localhost:5173/demo-test/",
    supportFile:false
  },
    viewportWidth:1024,
    viewportHeight:768,
    video:true,
});
