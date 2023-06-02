import {defineConfig} from 'vite'
import {feathers} from 'feathers-vite'
import vue from '@vitejs/plugin-vue'
import './src/HolidayBot'

// https://vitejs.dev/config/#async-config
export default defineConfig(async () => {
  const config = {
    plugins: [feathers(), vue()]
  }
  return config
})

