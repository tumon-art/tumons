import cssMobile from "./NavLinksM.module.scss";
import cssDesktop from "./NavLinksD.module.scss";
import Link from "next/link";

const NavLinks = ({ mobile }) => {
  const styles = mobile == "mobile" ? cssMobile : cssDesktop;
  return (
    <div className={styles.main}>
      <nav className={styles.nav}>
        <ol className={styles.ol}>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>Linux</li>
          <li>Text</li>
          <li>Text</li>
          <li>Text</li>
        </ol>
      </nav>
    </div>
  );
};
export default NavLinks;
