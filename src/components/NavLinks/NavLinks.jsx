import cssMobile from "./NavLinksM.module.scss";
import cssDesktop from "./NavLinksD.module.scss";
import Link from "next/link";
import useStore from "../../store/mainStore";
import { useEffect } from "react";

const NavLinks = ({ mobile }) => {
  // ZUSTAND
  const setWhiceCat = useStore((state) => state.setWhiceCat);
  const sidebar = useStore((state) => state.sidebar);
  const sidebarSwitch = useStore((state) => state.sidebarSwitch);

  const styles = mobile == "mobile" ? cssMobile : cssDesktop;

  useEffect(() => {
    if (sidebar === true) {
      document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
    } else document.getElementsByTagName("BODY")[0].style.overflow = "auto";
  }, [sidebar]);

  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <ol className={styles.ol}>
          <li>
            <Link href="/">
              <a
                onClick={() => {
                  setWhiceCat("Home");
                }}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a
                onClick={() => {
                  setWhiceCat("Linux");
                }}
              >
                Linux
              </a>
            </Link>
          </li>
          <li>Text</li>
          <li>Text</li>
          <li>Text</li>
        </ol>
      </nav>
    </div>
  );
};
export default NavLinks;
