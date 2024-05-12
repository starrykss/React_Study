# 프로젝트 실행 방법

## 들어가며

- 실습 프로젝트들은 `Vite`를 이용한다.
  - CRA(Create React App)는 JavaScript로 구성된 Webpack을 사용하는데 속도가 느린편이다.
  - 평소에는 못느낄 수 있지만 처리해야 할 코드의 양이 많아질 수록 느린 속도를 채감할 수 있다.
  - 위와 같은 단점을 해결하기 위해 Esbuild를 기반으로 만들어진 빌드툴인 `Vite`를 사용한다.

## 프로젝트 관련 명령어 정리

### 모듈 설치

- `package.json` 파일에 명시된 모듈들을 설치한다.

```bash
$ yarn
```

```bash
$ npm install
```

### 프로젝트 실행하기

- 로컬 서버를 실행하고, 프로젝트 안의 내용을 로컬 서버에 띄운다.

```bash
$ yarn dev
```

```bash
$ npm run dev
```

### 기타

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
