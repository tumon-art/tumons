import { useEffect, useState } from "react";
import useStore from "../../store/mainStore";
import NavLinks from "../NavLinks/NavLinks";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  const sidebar = useStore((state) => state.sidebar);
  const sidebarSwitch = useStore((state) => state.sidebarSwitch);
  const setSidebar = useStore((state) => state.setSidebar);

  const [position, setPosition] = useState();
  const [visible, setVisible] = useState(true);

  useEffect(() => setPosition(window.scrollY), []);

  useEffect(() => {
    const handleScroll = (e) => {
      let moving = window.scrollY;

      setVisible(position > moving);
      setPosition(moving);
    };

    let head = document.getElementById("head");

    if (visible == true) head.style.transform = "translateY(0px)";
    else head.style.transform = "translateY(-100px)";

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  // SIDEBAR TOOGLE ICON ANIM.
  useEffect(() => {
    if (sidebar === true) {
      // IF OPEN
      const svg = document.getElementById("svg");
      svg.style.transform = "rotate(90deg)";
    }
    if (sidebar === false) {
      // IF CLOSED
      const svg = document.getElementById("svg");
      svg.style.transform = "rotate(0deg)";
    }
  }, [sidebar]);

  // SHOW SIDEBAR - ICON
  const svgToOpen = () => (
    <svg
      className={styles.svgSideBar}
      id="svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414
      1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10
      11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293
      5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  // HIDE SIDEBAR - ICON
  const svgToClose = () => (
    <svg
      className={styles.svgSideBar}
      id="svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0
      011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0
      110 2h-6a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <>
      <div id="head" className={styles.head}>
        <div>
          <Link href="/">
            <a>
              <svg
                className={styles.svgCode}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1
              0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414
              10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0
              011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0
              11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>

        {/* === SHOW/HIDE SIDEBAR ICON */}
        <div>
          <Sidebar />
          <div id="toggle" onClick={() => sidebarSwitch()}>
            {sidebar ? svgToOpen() : svgToClose()}
          </div>
          <NavLinks />
        </div>
      </div>
    </>
  );
};
export default Header;
