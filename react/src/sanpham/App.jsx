import Sidebar from '../components/sp_sidebar'
import SanPhamTable from '../components/sp_table'
import Toolbar from '../components/sp_toolbar'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.App}>
      <Sidebar />
      <div className={styles["main-content"]}>
        <Toolbar />
        <SanPhamTable />
      </div>
    </div>
  )
}

export default App
