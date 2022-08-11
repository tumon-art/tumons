import cssMobile from "./NavLinksM.module.scss";
import cssDesktop from "./NavLinksD.module.scss";
import Link from "next/link";
import useStore from "../../store/mainStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NavLinks = ({ mobile }) => {
  const router = useRouter();

  console.log(router.asPath !== "/");
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
            {router.asPath !== "/" ? (
              <Link href="/">
                <a
                  onClick={() => {
                    setWhiceCat("Home");
                  }}
                >
                  Home
                </a>
              </Link>
            ) : (
              <div
                onClick={() => {
                  setWhiceCat("Home");
                }}
              >
                Home
              </div>
            )}
          </li>

          <li>
            {router.asPath !== "/" ? (
              <Link href="/">
                <a
                  onClick={() => {
                    setWhiceCat("Linux");
                  }}
                >
                  Linux
                </a>
              </Link>
            ) : (
              <div
                onClick={() => {
                  setWhiceCat("Linux");
                }}
              >
                Linux
              </div>
            )}
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
