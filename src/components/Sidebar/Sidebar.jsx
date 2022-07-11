import styles from './Sidebar.module.scss'
import useStore from "../../store/mainStore";

const Sidebar = () => {
    const sidebar = useStore((state) => state.sidebar);
    const sidebarSwitch = useStore((state) => state.sidebarSwitch);
  return (
   <div className={`${styles.main} ${sidebar ? styles.main__show : styles.main__hide } `}>
   </div>
  )
}
export default Sidebar
