
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // هام: قم بتغيير 'your-repo-name' إلى اسم المستودع الخاص بك على GitHub
  // مثال: إذا كان المستودع هو 'my-awesome-app', ضع '/my-awesome-app/'
  base: '/your-repo-name/', 
  plugins: [react()],
})
