import styles from "./Sidebar.module.scss";
import useStore from "../../store/mainStore";
import NavLinks from "../NavLinks/NavLinks";
import { useEffect, useRef } from "react";

const Sidebar = () => {
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        null;
      }
    });
  }, [ref]);

  const sidebar = useStore((state) => state.sidebar);
  const setSidebar = useStore((state) => state.setSidebar);
  return (
    <div
      ref={ref}
      className={`${styles.main} ${
        sidebar ? styles.main__show : styles.main__hide
      } `}
    >
      <NavLinks mobile="mobile" />
    </div>
  );
};
export default Sidebar;
