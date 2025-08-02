// types/global.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NOTEHUB_TOKEN: string;
    }
  }
  