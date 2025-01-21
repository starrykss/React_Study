# 레포지토리 소개

## Stacks

```text
HTML, CSS, JavaScript,
SCSS, styled-components, TailwindCSS, CSS Modules,
Redux, React Router, React Query(Tanstack Query),
Next.js, Framer-Motion, MongoDB, Firebase
```

## Sections

```text
Section 1. Getting Started
Section 2. JavaScript Refresher
Section 3. React Essentials - Components, JSX, Props, State & More
Section 4. React Essentials - Deep Dive
Section 5. React Essentials - Practice Project
Section 6. Styling React Components
Section 7. Debugging React Apps
Section 8. Working with Refs & Portals
Section 9. Practice Project: Project Management App (with Components, State, Refs & More)
Section 10. React’s Context API & useReducer - Advanced State Management
Section 11. Handling Side Effects & Working with the useEffect() Hook
Section 12. Practice Project: Building a Quiz App
Section 13. Behind The Scenes
Section 14. An Alternative Way Of Building Components: Class-based Components
Section 15. Sending Http Requests (e.g. Connecting to a Database)
Section 16. Building Custom React Hooks
Section 17. Working with Forms & User Input
Section 18. Practice Project: Building a Food Order App
Section 19. Diving into Redux (An Alternative To The Context API)
Section 20. Advanced Redux
Section 21. Building a Multi-Page SPA with React Router
Section 22. Adding Authentication to React Apps
Section 23. Deploying React Apps
Section 24. React Query / Tanstack Query: Handling HTTP Requests With Ease
Section 25. A (Pretty Deep Dive) Introduction to Next.js
Section 26. Animating React Apps
Section 27. React Patterns & Best Practices
Section 28. Replacing Redux with React Hooks
Section 29. Testing React Apps (Unit Tests)
Section 30. React + TypeScript
Section 31. Optional: React Summary & Core Feature Walkthrough
Section 32. Course Roundup
Section 33. Course Update & Old Course Content
Section 34. BONUS / OPTIONAL React Basics & Working With Components
Section 35. BONUS / OPTIONAL Time to Practice: Component Basics
Section 36. BONUS / OPTIONAL React State & Working with Events
Section 37. BONUS / OPTIONAL Rendering Lists & Conditional Content
Section 38. BONUS / OPTIONAL Time to Practice: A Complete Practice Project
Section 39. UPDATED / Handling Forms via Form Actions (React 19)
Section 40. UPDATED / React Server Components (RSC) & Server Actions - A Closer Look  (React 19)
```

## Section Information

## 프로젝트 실행 방법

### 들어가며

- 실습 프로젝트들은 `Vite`를 이용한다.
  - CRA(Create React App)는 JavaScript로 구성된 Webpack을 사용하는데 속도가 느린편이다.
  - 평소에는 못느낄 수 있지만 처리해야 할 코드의 양이 많아질 수록 느린 속도를 채감할 수 있다.
  - 위와 같은 단점을 해결하기 위해 Esbuild를 기반으로 만들어진 빌드툴인 `Vite`를 사용한다.

### 프로젝트 관련 명령어 정리

#### 모듈 설치

- `package.json` 파일에 명시된 모듈들을 설치한다.

```bash
$ yarn
```

```bash
$ npm install
```

#### 프로젝트 실행하기

- 로컬 서버를 실행하고, 프로젝트 안의 내용을 로컬 서버에 띄운다.

```bash
$ yarn dev
```

```bash
$ npm run dev
```

#### 기타

- 기타 사용 가능한 다양한 명령어들은 프로젝트 내부의 `package.json` 파일 안의 `script` 항목 내부를 확인한다.

> package.json

```js
{
  "name": "react-essentials-start",
  "version": "0.0.0",
  "scripts": {    //✅ Check here!
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.9"
  },
  "keywords": [],
  "description": ""
}

```
