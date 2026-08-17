import os
import zipfile

files = {
    "package.json": """{
  "name": "facehook",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.469.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2"
  }
}""",
    "tailwind.config.ts": """import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fb: {
          blue: "#1877F2",
          bg: "#F0F2F5",
          card: "#FFFFFF",
          text: "#050505",
          secondary: "#65676B",
          hover: "#E4E6EB",
          darkBg: "#18191A",
          darkCard: "#242526"
        }
      }
    },
  },
  plugins: [],
};
export default config;""",
    "tsconfig.json": """{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}""",
    "next.config.mjs": """/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};
export default nextConfig;""",
    "app/globals.css": """@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-fb-bg text-fb-text antialiased selection:bg-fb-blue selection:text-white;
    -webkit-tap-highlight-color: transparent;
  }
}"""
}

def create_project():
    for path, content in files.items():
        dir_name = os.path.dirname(path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
    
    with zipfile.ZipFile("facehook.zip", "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, filenames in os.walk("."):
            for filename in filenames:
                if filename != "facehook.zip" and not root.startswith("./."):
                    zipf.write(os.path.join(root, filename))

if __name__ == "__main__":
    create_project()
    print("facehook project structure and facehook.zip generated successfully!")