import styles from "@/global.less";
import add from './utils/add.ts'
import sub from './utils/sub.ts'
/** 测试注释 */
const container = document.querySelector("#container");
console.log(process.env.NODE_ENV, API_PERFIX);
if (container) {
  container.className = styles["container"];
}

const prefetchBtn = document.querySelector("#prefetch");
const preloadBtn = document.querySelector("#preload");

let preloadFunc: any = null;
console.log(styles);
setTimeout(async () => {
  const { default: Func } = await import(
    /* webpackChunkName: "COMMON_MODULE" */
    /* webpackPreload: true */ "./utils/common.ts"
  );
  preloadFunc = Func;
}, 1000);

prefetchBtn?.addEventListener("click", async () => {
  const { default: Func } = await import(
    /* webpackChunkName: "ASYNC_MODULE" */
    /* webpackPrefetch: true */
    "./utils/async.ts"
  );

  Func();
});

/** 测试注释 */
preloadBtn?.addEventListener("click", () => {
  preloadFunc && preloadFunc();
});


function unuser(){
    console.log('unused')
}