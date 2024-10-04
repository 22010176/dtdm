DROP DATABASE IF EXISTS btl;
CREATE DATABASE  btl;
USE btl;

DROP TABLE IF EXISTS trangThai;
CREATE TABLE trangthai (
	ma INT PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) UNIQUE
);
INSERT INTO trangThai (ten) VALUES ('hienThi'), ('an');
SELECT * FROM trangThai;

-- Bảng hedieuhanh
DROP TABLE IF EXISTS hedieuhanh;
CREATE TABLE hedieuhanh (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT,
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);
INSERT INTO hedieuhanh VALUES 
("a", "window", 1),
("b", "ios", 1),
("c", "apple", 1),
("d", "ubuntu",1);

SELECT * FROM hedieuhanh ;

-- Bảng thuonghieu
DROP TABLE IF EXISTS thuonghieu;
CREATE TABLE thuonghieu (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT,
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);
INSERT INTO thuonghieu VALUES 
("a", "apple", 1),
("b", "window", 1),
("c", "google", 1),
("d", "samsung", 1);
SELECT * FROM thuonghieu;
UPDATE thuonghieu SET ten = "ed", trangthai = 3 WHERE ma = "0cc96f04-7610-4776-663-d8f7e2baef2c";
SELECT * FROM thuonghieu WHERE ma = "035039a3-af04-4c3c-9524-da8d9c24c0bd";

-- Bảng xuatxu
DROP TABLE IF EXISTS xuatxu;
CREATE TABLE xuatxu (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT,
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);
INSERT INTO xuatxu VALUES 
("a", "My", 1),
("b", "Han Quoc", 1),
("c", "Trung Quoc", 1);
SELECT * FROM xuatxu;
UPDATE xuatxu SET ten = "ed", trangthai = 3 WHERE ma = "0cc96f04-7610-4776-663-d8f7e2baef2c";
SELECT * FROM xuatxu WHERE ma = "035039a3-af04-4c3c-9524-da8d9c24c0bd";

-- Bảng mausac
DROP TABLE IF EXISTS mausac;
CREATE TABLE mausac (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT,
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);
INSERT INTO mausac VALUES
('a', 'vang', 1),
('b', 'bac', 1),
('c', 'dong', 1);
SELECT * FROM mausac;
-- Bảng dungluongram
DROP TABLE IF EXISTS ram;
CREATE TABLE ram (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT,
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);
INSERT INTO ram VALUES
('a', '4GB', 1),
('b', '8GB', 1),
('c', '12GB', 1);

-- Bảng dungluongrom
DROP TABLE IF EXISTS rom;
CREATE TABLE rom (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT,
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);
INSERT INTO rom VALUES
('a', '4GB', 1),
('b', '8GB', 1),
('c', '12GB', 1);

-- Bảng sanpham
DROP TABLE IF EXISTS sanpham;
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
    FOREIGN KEY (xuatxu) REFERENCES xuatxu(ma),
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
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
("A3", "2", "a", "2", 33, 33, "2", "2", "a", "2", 33, "a", 1),
("A1", "2", "a", "2", 33, 33, "2", "2", "a", "2", 33, "a", 1);
UPDATE sanpham SET trangThai = 0 WHERE ma = "a";

UPDATE sanpham SET 
ten = '', xuatxu = 'a', cpu ='ddd', dungLuongPin = 34, 
kichThuocManHinh = 34, cam_truoc = "", cam_sau = "", heDieuHanh = "a",
phienBanHDH="", thoiGianBaoHanh = 34, thuongHieu = "a"
WHERE ma = 'a7';
SELECT * FROM sanpham WHERE ma = 'AA6';

-- Bảng phienbansanpham
DROP TABLE IF EXISTS phienbansanpham;
CREATE TABLE phienbansanpham (
    ma VARCHAR(255) PRIMARY KEY,
    maSanPham VARCHAR(255), -- Tham chiếu tới bảng sanpham
    rom VARCHAR(255),
    ram VARCHAR(255),
    mausac VARCHAR(255), -- Tham chiếu tới bảng mausac
    gianhap INT,
    giaxuat INT,
    trangthai INT,
    
    FOREIGN KEY (maSanPham) REFERENCES sanpham(ma),
    FOREIGN KEY (mausac) REFERENCES mausac(ma),
    FOREIGN KEY (rom) REFERENCES rom(ma),
    FOREIGN KEY (ram) REFERENCES ram(ma),
    FOREIGN KEY (trangThai) REFERENCES trangThai(ma)
);

SELECT pbsp.ma, ram.ten AS ram, rom.ten AS rom, mausac.ten AS mausac, gianhap, giaxuat FROM phienbansanpham AS pbsp
INNER JOIN ram ON ram.ma = pbsp.ram
INNER JOIN rom ON rom.ma = pbsp.rom
INNER JOIN mausac ON mausac.ma = pbsp.mausac
WHERE pbsp.trangThai = 1;

INSERT INTO phienbansanpham (ma, maSanPham, rom, ram, mausac, gianhap, giaxuat, trangthai) VALUES 
("g3", "A1", "a", "a", "a", 33, 44, 1),
("d3", "A1", "a", "a", "a", 33, 44, 1),
("d3d", "A3", "a", "a", "a", 33, 44, 1),
("b3", "A3", "a", "a", "a", 33, 444, 1);

UPDATE phienbansanpham 
SET rom = "a", ram = "b", mausac = "a", gianhap = 10, giaxuat = 33
WHERE ma = "12563c26-a525-4a7c-b62f-3130e8137b92" AND masanpham = "A1";

SELECT * FROM phienbansanpham WHERE ma = '08340a29-9ed0-435a-a973-f06b7fb18e1a';

UPDATE phienbansanpham SET trangThai = 2
WHERE ma = "g3" AND maSanPham = "A1";

SELECT * FROM phienbansanpham WHERE trangThai = 1;	