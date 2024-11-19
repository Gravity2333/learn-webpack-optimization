import React from "react";
import ReactDOM from "react-dom";
import styles from '@/global.less'

const App = () => {
  return <div className={styles['container']}>Hello React</div>;
};

ReactDOM.render(App(), document.querySelector("#mount-root"));
