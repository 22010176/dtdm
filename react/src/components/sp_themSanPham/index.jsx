/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import styles from './style.module.css'

// đại khái thì màu ở bản design trong balsamiq nếu ko có j thay đổi thì sẽ giữ như vậy
// còn mấy cái phần có diện tích nhỏ như kiểu nút các thứ thì cho màu đậm hơn 1 chút thôi rồi khi có sự kiện cho nút đấy thì đậm hơn
// tôi thấy cô kiểu thích có nhiều màu sắc cho đẹp, nma tôi thấy mk nên tiết chế nó = sắc độ ko thì hơi kinh...\
// tử tưởng chung là nx phần có diện tích lớn thì màu nhạt nhạt chút (giữ nguyên loại màu: đỏ/xanh/ vang/ hồng ..) nma giảm độ đậm xuống nhìn cho đỡ ố dề

export default function AddProduct({ visible = false }) {
  return (
    <>
      <div className={styles.container} style={{ display: visible ? "block" : "none" }}>
      </div>
      <div className={styles.content} style={{ display: visible ? "block" : "none" }}>
        <div className={styles.title}>
          <h1>Them San Pham</h1>
        </div>
        <div className={styles["form-input"]}>
          <form action="/" method="get">
            <div className={styles["input-sec"]}>
              <button className={styles['addImg']}>
                <FontAwesomeIcon icon={faCamera} />
                <span>Hinh minh hoa</span>
              </button>
              <img className={styles['demo-img']} src="public/img/logo.jpg" alt="" />
            </div>

            <div className={styles["fields"]}>
              {/* Ten san pham */}
              <div className={styles["input-sec"]}>
                <label htmlFor="tenSanPham" className={styles['input-label']}>Ten san pham</label>
                <input className={styles['form-text-input']} type="text" id='tenSanPham' name='tenSanPham' />
              </div>

              {/* Xuat xu */}
              <div className={styles["input-sec"]}>
                <label htmlFor="xuatXu" className={styles['input-label']}>Xuat xu</label>
                <select name='xuatXu' id='xuatXu'>
                  <option value="Korean">Korean</option>
                  <option value="China">China</option>
                </select>
              </div>

              {/* CPU */}
              <div className={styles["input-sec"]}>
                <label htmlFor="CPU" className={styles['input-label']}>Chip xu ly</label>
                <input className={styles['form-text-input']} type="text" name='CPU' id='CPU' />
              </div>

              {/* Pin */}
              <div className={styles["input-sec"]}>
                <label htmlFor="dungLuongPin" className={styles['input-label']}>Dung luong pin</label>
                <input className={styles['form-text-input']} type="number" name='dungLuongPin' id='dungLuongPin' />
              </div>

              {/* Man hinh */}
              <div className={styles["input-sec"]}>
                <label htmlFor="kichThuocMan" className={styles['input-label']}>Kich thuoc man</label>
                <input className={styles['form-text-input']} type="number" name='kichThuocMan' id="kichThuocMan" />
              </div>

              {/* Camera truoc */}
              <div className={styles["input-sec"]}>
                <label htmlFor="camTruoc" className={styles['input-label']}>Camera trước</label>
                <input className={styles['form-text-input']} type="number" name='camTruoc' />
              </div>

              {/* Camera sau */}
              <div className={styles["input-sec"]}>
                <label htmlFor="camSau" className={styles['input-label']}>Camera sau</label>
                <input className={styles['form-text-input']} type="number" name='camSau' />
              </div>

              {/* He dieu hanh */}
              <div className={styles["input-sec"]}>
                <label htmlFor="heDieuHanh" className={styles['input-label']}>heDieuHanh</label>
                <select name='heDieuHanh' id='heDieuHanh'>
                  <option value="window">window</option>
                  <option value="android">android</option>
                </select>
              </div>

              {/* Phien ban hdh */}
              <div className={styles["input-sec"]}>
                <label htmlFor="pbHDH" className={styles['input-label']}>Phien ban he dieu hanh</label>
                <select name='pbHDH' id='pbHDH'>
                  <option value="window">window</option>
                  <option value="android">android</option>
                </select>
              </div>

              {/* Thoi gian bao hanh */}
              <div className={styles["input-sec"]}>
                <label htmlFor="tgBH" className={styles['input-label']}>Thoi gian bao hanh</label>
                <input className={styles['form-text-input']} name='tgBH' id='tgBH' />
              </div>

              {/* Thuong hieu */}
              <div className={styles["input-sec"]}>
                <label htmlFor="thuongHieu" className={styles['input-label']}>Phien ban he dieu hanh</label>
                <select name='thuongHieu' id='thuongHieu'>
                  <option value="samsung">samsung</option>
                  <option value="apple">apple</option>
                </select>
              </div>
            </div>

            <div className={styles["submit-section"]}>
              <button className={styles['submit']} type='submit'>Tao cau hinh</button>
              <button className={styles['cancle']}>Huy bo</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}