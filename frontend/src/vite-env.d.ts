/// <reference types="vite/client" />

// vite-env.d.ts 파일은 Vite와 관련된 TypeScript 타입 선언 파일

// 주요 목적은:
// Vite의 특수 기능을 TypeScript가 이해할 수 있게 하는 것

// 특히 다음과 같은 Vite의 기능들에 대한 타입 지원을 제공:
// import.meta.env 환경 변수
// .css, .svg, .png 등 정적 자산 imports
// import.meta.hot (HMR API)

// 이 파일에 있는 /// <reference types="vite/client" /> 구문은 Vite의 클라이언트 타입 정의를 프로젝트에 포함시키라고 TypeScript에게 지시하는 역할
// 이 파일은 Vite 프로젝트 생성 시 자동으로 생성되며, 프로젝트에서 Vite의 기능을 TypeScript와 함께 사용하기 위해 필요
// 파일을 삭제하면 TypeScript가 Vite의 특수 기능들을 인식하지 못할 수 있음
