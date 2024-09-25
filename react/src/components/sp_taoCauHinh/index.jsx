import styles from './style.module.css'

export default function ThemCauHinh() {
  return (
    <div className={styles.container}>
      <form className={styles["input-form"]}>
        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="rom" className={styles["field-title"]}>ROM</label>
          <select name="rom" id="rom" className={styles["filed-input"]}>
            <option value="32">32GB</option>
            <option value="16">16GB</option>
            <option value="8">8GB</option>
            <option value="32">32GB</option>
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="ram" className={styles["field-title"]}>RAM</label>
          <select name="RAM" id="ram" className={styles["filed-input"]}>
            <option value="32">32GB</option>
            <option value="16">16GB</option>
            <option value="8">8GB</option>
            <option value="32">32GB</option>
          </select>
        </div>

        {/* Color */}
        <div className={styles["form-section"]}>
          <label htmlFor="color" className={styles["field-title"]}>Mau sac</label>
          <select name="color" id="color" className={styles["filed-input"]}>
            <option value="32">32GB</option>
            <option value="16">16GB</option>
            <option value="8">8GB</option>
            <option value="32">32GB</option>
          </select>
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaNhap" className={styles["field-title"]}>Gia nhap</label>
          <input type="text" name="giaNhap" id="giaNhap" className={styles["filed-input"]} />
        </div>

        {/* ROM */}
        <div className={styles["form-section"]}>
          <label htmlFor="giaXuat" className={styles["field-title"]}>Gia xuat</label>
          <input type="text" name="giaXuat" id="giaXuat" className={styles["filed-input"]} />
        </div>
      </form>

      <div className={styles["table-data"]}>
        <table className={styles['data-table']}>
          <tr>
            <th>Stt</th>
            <th>RAM</th>
            <th>ROM</th>
            <th>Mau sac</th>
            <th>Gia nhap</th>
            <th>Gia xuat</th>
          </tr>
          <tr>
            <td className={styles['stt-col']}>1</td>
            <td className={styles['rom-col']}>32GB</td>
            <td className={styles['ram-col']}>32GB</td>
            <td className={styles['color-col']}>Vang</td>
            <td className={styles['import-col']}>8000000</td>
            <td className={styles['export-col']}>80000000</td>
          </tr>
        </table>

        <div className={styles["tools-btn"]}>
          <button >Them cau hinh</button>
          <button >Sua cau hinh</button>
          <button >Xoa cau hinh</button>
          <button >Lam moi cau hinh</button>
        </div>
      </div>
      <div className={styles["submit-btn"]}>
        <button>Them san pham moi</button>
        <button>Quay lai trang truoc</button>
      </div>
    </div>
  )
}