CREATE DATABASE  btl;
-- DROP DATABASE btl;
USE btl;

-- Bảng hedieuhanh
CREATE TABLE hedieuhanh (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);

INSERT INTO hedieuhanh VALUES 
("a", "2", 1),
("b", "2", 1),
("c", "2", 1);

SELECT * FROM hedieuhanh;

-- Bảng thuonghieu
CREATE TABLE thuonghieu (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);
INSERT INTO thuonghieu VALUES 
("a", "2", 1),
("b", "2", 1),
("c", "2", 1);
SELECT * FROM thuonghieu;
UPDATE thuonghieu SET ten = "ed", trangthai = 3 WHERE ma = "0cc96f04-7610-4776-663-d8f7e2baef2c";
SELECT * FROM thuonghieu WHERE ma = "035039a3-af04-4c3c-9524-da8d9c24c0bd";

-- Bảng xuatxu
CREATE TABLE xuatxu (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);
INSERT INTO xuatxu VALUES 
("a", "2", 1),
("b", "2", 1),
("c", "2", 1);
SELECT * FROM xuatxu;
UPDATE xuatxu SET ten = "ed", trangthai = 3 WHERE ma = "0cc96f04-7610-4776-663-d8f7e2baef2c";
SELECT * FROM xuatxu WHERE ma = "035039a3-af04-4c3c-9524-da8d9c24c0bd";

-- Bảng mausac
CREATE TABLE mausac (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);

-- Bảng dungluongram
CREATE TABLE ram (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);

-- Bảng dungluongrom
CREATE TABLE rom (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);

-- Bảng sanpham
DROP TABLE IF EXISTS sanpham;
CREATE TABLE sanpham (
	hinhanh VARCHAR(255),

    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    
    dungluongpin INT,
    kichthuocmanhinh VARCHAR(255),
    phienbanhdh VARCHAR(255),
    cam_sau VARCHAR(255),
    cam_truoc VARCHAR(255),
    thoigianbaohanh INT,
    trangthai INT,
    cpu VARCHAR(255), 
    xuatxu VARCHAR(255), -- Tham chiếu tới bảng xuatxu
    hedieuhanh VARCHAR(255), -- Tham chiếu tới bảng hedieuhanh
    thuonghieu VARCHAR(255), -- Tham chiếu tới bảng thuonghieu
    
    FOREIGN KEY (hedieuhanh) REFERENCES hedieuhanh(ma),
    FOREIGN KEY (thuonghieu) REFERENCES thuonghieu(ma),
    FOREIGN KEY (xuatxu) REFERENCES xuatxu(ma)
);
SELECT sp.ma, sp.ten, sp.phienbanHDH, xx.ten AS xuatxu, hdh.ten AS hedieuhanh, th.ten AS thuonghieu 
FROM sanpham AS sp
INNER JOIN xuatxu AS xx ON xx.ma =  sp.xuatxu
INNER JOIN thuonghieu AS th ON sp.thuonghieu = th.ma
INNER JOIN hedieuhanh AS hdh ON hdh.ma = sp.hedieuhanh
WHERE sp.trangThai != 0 OR 1 = 1;

SELECT * FROM sanpham;

INSERT INTO sanpham 
(ma, ten, xuatxu, cpu, dungLuongPin, kichThuocManHinh, cam_truoc, cam_sau, heDieuHanh, phienBanHDH, thoiGianBaoHanh, thuongHieu, trangThai) VALUES 
("dde32dd33", "2", "a", "2", 33, 33, "2", "2", "a", "2", 33, "a", 1);
UPDATE sanpham SET trangThai = 0 WHERE ma = "dde3233";

UPDATE sanpham SET 
ten = '', xuatxu = '', cpu ='', dungLuongPin = 34, 
kichThuocManHinh = 34, cam_truoc = "", cam_sau = "", heDieuHanh = "",
phienBanHDH="", thoiGianBaoHanh = 34, thuongHieu = ""
WHERE ma = '';

-- Bảng phienbansanpham
DROP TABLE phienbansanpham;
CREATE TABLE phienbansanpham (
    ma VARCHAR(255) PRIMARY KEY,
    maSanPham VARCHAR(255), -- Tham chiếu tới bảng sanpham
    rom VARCHAR(255),
    ram VARCHAR(255),
    maMau VARCHAR(255), -- Tham chiếu tới bảng mausac
    gianhap INT,
    giaxuat INT,
    soluongton INT,
    trangthai INT,
    
    FOREIGN KEY (maSanPham) REFERENCES sanpham(ma),
    FOREIGN KEY (maMau) REFERENCES mausac(ma),
    FOREIGN KEY (rom) REFERENCES rom(ma),
    FOREIGN KEY (ram) REFERENCES ram(ma)
);