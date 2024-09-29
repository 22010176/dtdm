CREATE DATABASE btl;
USE btl;

-- Bảng hedieuhanh
CREATE TABLE hedieuhanh (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);

INSERT INTO hedieuhanh VALUES 
("1", "2", 1),
("12", "2", 1),
("14", "2", 1);

SELECT * FROM hedieuhanh;

-- Bảng thuonghieu
CREATE TABLE thuonghieu (
    ma VARCHAR(255) PRIMARY KEY,
    ten VARCHAR(255),
    trangthai INT
);
INSERT INTO thuonghieu VALUES 
("1", "2", 1),
("12", "2", 1),
("14", "2", 1);

SELECT * FROM thuonghieu;

-- Bảng xuatxu
CREATE TABLE xuatxu (
    maxuatxu INT PRIMARY KEY,
    tenxuatxu VARCHAR(255),
    trangthai INT
);

-- Bảng mausac
CREATE TABLE mausac (
    mamau INT PRIMARY KEY,
    tenmau VARCHAR(255),
    trangthai INT
);

-- Bảng dungluongram
CREATE TABLE dungluongram (
    madlram INT PRIMARY KEY,
    kichthuocram VARCHAR(255),
    trangthai INT
);

-- Bảng dungluongrom
CREATE TABLE dungluongrom (
    madlrom INT PRIMARY KEY,
    kichthuocrom VARCHAR(255),
    trangthai INT
);

-- Bảng sanpham
CREATE TABLE sanpham (
    masp INT PRIMARY KEY,
    tensp VARCHAR(255),
    hinhanh VARCHAR(255),
    xuatxu INT, -- Tham chiếu tới bảng xuatxu
    chipxuly VARCHAR(255),
    dungluongpin INT,
    kichthuocmanhinh VARCHAR(255),
    hedieuhanh INT, -- Tham chiếu tới bảng hedieuhanh
    phienbanhdh VARCHAR(255),
    camerasau VARCHAR(255),
    cameratruoc VARCHAR(255),
    thoigianbaohanh INT,
    thuonghieu INT, -- Tham chiếu tới bảng thuonghieu
    soluongton INT,
    trangthai INT,
    FOREIGN KEY (hedieuhanh) REFERENCES hedieuhanh(mahedieuhanh),
    FOREIGN KEY (thuonghieu) REFERENCES thuonghieu(mathuonghieu),
    FOREIGN KEY (xuatxu) REFERENCES xuatxu(maxuatxu)
);

-- Bảng phienbansanpham
CREATE TABLE phienbansanpham (
    maphienbansp INT PRIMARY KEY,
    masp INT, -- Tham chiếu tới bảng sanpham
    rom INT,
    ram INT,
    mausac INT, -- Tham chiếu tới bảng mausac
    gianhap DECIMAL(10, 2),
    giaxuat DECIMAL(10, 2),
    soluongton INT,
    trangthai INT,
    FOREIGN KEY (masp) REFERENCES sanpham(masp),
    FOREIGN KEY (mausac) REFERENCES mausac(mamau)
);