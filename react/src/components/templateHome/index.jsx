/* eslint-disable react/prop-types */
import Sidebar from '../sidebar'
import Toolbar from '../sp_toolbar'
import styles from './style.module.css'

export default function TemplateHome({ children }) {
  return (
    <div className={styles.App}>
      <Sidebar />
      {children}
    </div>
  )
}