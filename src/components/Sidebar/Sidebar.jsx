import styles from './Sidebar.module.scss'
import useStore from "../../store/mainStore";
import NavLinks from '../NavLinks/NavLinks';

const Sidebar = () => {
    const sidebar = useStore((state) => state.sidebar);
    
    return (
   <div className={`${styles.main} ${sidebar ? styles.main__show : styles.main__hide } `}>
    <NavLinks mobile='mobile'/>
   </div>
  )
}
export default Sidebar
