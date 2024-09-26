import Sidebar from '../../components/sidebar'
import Toolbar from '../../components/sp_toolbar'
import TemplateHome from '../../components/templateHome'
import styles from './style.module.css'

export default function HomePage() {
  return (
    <TemplateHome>
      <div className={styles["main-content"]}>
        <div className={styles["title"]}>
          <h1 >
            Chào mừng đến với hệ thống quản lí điện thoại thông minh
          </h1>
          <h2>Hệ thống hỗ trợ quản lý các sản phẩm điện thoại thông qua mã IMEI một cách chính xác, dễ dàng và hiệu quả.</h2>
        </div>
        <img src="img/bbb.jpg" alt="" />
      </div>
    </TemplateHome>
  )
}