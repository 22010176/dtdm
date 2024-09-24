import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faRightFromBracket, faUnlockKeyhole, faCheckCircle, faCircleUser, faHouse, faTabletScreenButton, faWarehouse, faHandshakeSimple, faShieldHalved, faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

function Sidebar() {
  return (
    <aside className={styles["left-side-bar"]}>
      <div className={styles["account"]}>
        <img src="./img/logo.jpg" alt="" className={styles["logo"]} />
        <div className={styles["user-information"]}>
          <p className={[styles["user-name"], styles['bold']].join(" ")}>Duong chan</p>
          <p className={[styles["role"], styles["normal"]].join(" ")}>Quan ly kho</p>
        </div>
      </div>

      <div className={styles["categories"]}>

        <div className={styles["categories-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <p className={styles["category-title"]}>
            <a href="">Trang chu</a>
          </p>
        </div>


        <div className={styles["dropdown"]}>
          <div className={[styles["categories-item"], styles["active"]].join(" ")}>
            <div className={styles["icon"]}>
              <FontAwesomeIcon icon={faTabletScreenButton} />
            </div>
            <p className={styles["category-title"]}> Quan ly san pham </p>
            <div className={[styles["arrow"], styles["trigger"]].join(" ")}>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>

          <ul className={styles["dropdown-container"]}>
            <li className={styles["item"]}><a href="">San pham</a></li>
            <li className={styles["item"]}><a href="">Thuoc tinh</a></li>
          </ul>
        </div>


        <div className={styles["dropdown"]}>
          <div className={styles["categories-item"]}>
            <div className={styles["icon"]}>
              <FontAwesomeIcon icon={faWarehouse} />
            </div>
            <p className={styles["category-title"]}> Quan ly xuat nhap </p>
            <div className={[styles["arrow"], styles["trigger"]].join(" ")}>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>

          <ul className={styles["dropdown-container"]}>
            <li className={styles["item"]}><a href="">Nhap kho</a></li>
            <li className={styles["item"]}><a href="">Xuat kho</a></li>
          </ul>
        </div>


        <div className={styles["dropdown"]}>
          <div className={styles["categories-item"]}>
            <div className={styles["icon"]}>
              <FontAwesomeIcon icon={faHandshakeSimple} />
            </div>
            <p className={styles["category-title"]}> Quan ly doi tac </p>
            <div className={[styles["arrow"], styles["trigger"]].join(" ")}>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>

          <ul className={styles["dropdown-container"]}>
            <li className={styles["item"]}><a href="">Nha cung cap</a></li>
            <li className={styles["item"]}><a href="">Khach hang</a></li>
          </ul>
        </div>


        <div className="dropdown">
          <div className={styles["categories-item"]}>
            <div className={styles["icon"]}>
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <p className={styles["category-title"]}> Quan ly dich vu </p>
            <div className={[styles["arrow"], styles["trigger"]].join(" ")}>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>

          <ul className={styles["dropdown-container"]}>
            <li className={styles["item"]}><a href="">Doi hang</a></li>
            <li className={styles["item"]}><a href="">Tra hang</a></li>
            <li className={styles["item"]}><a href="">Bao hanh</a></li>
          </ul>
        </div>

        <div className={styles["categories-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faClipboardUser} />
          </div>
          <p className={styles["category-title"]}>
            <a href="">Nhan vien</a>
          </p>
        </div>

        <div className={styles["categories-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faCircleUser} />
          </div>
          <p className={styles["category-title"]}>
            <a href=""> Tai khoan</a>
          </p>
        </div>

        <div className={styles["categories-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <p className={styles["category-title"]}>
            <a href="">Thong ke</a>
          </p>
        </div>

        <div className={styles["categories-item"]}>
          <div className={styles["icon"]}>
            <FontAwesomeIcon icon={faUnlockKeyhole} />
          </div>
          <p className={styles["category-title"]}>
            <a href="">Phan quyen</a>
          </p>
        </div>
      </div>

      <div className={[styles["categories-item"], styles["log-out"]].join(" ")}>
        <div className={styles["icon"]}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
        <p className={styles["category-title"]}>Dang xuat </p>
      </div>
    </aside>
  )
}

export default Sidebar