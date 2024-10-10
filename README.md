## Bước 1: Tạo VPC
### Tạo VPC.
Truy cập vào [trang VPC](https://ap-southeast-1.console.aws.amazon.com/vpcconsole/home?region=ap-southeast-1#Home) để tạo VPC.
![alt text](./nodegetstarted/a.png)

Khi vào trang giao diện, chọn **Create VPC**.
![alt text](./nodegetstarted/b.png)

Ở đây, chọn **VPC and more**. Đặt tên theo ý muốn bản thân, còn lại giữ nguyên các cài đặt mặc định của VPC.
Sau đó ấn **Create VPC**
![alt text](./nodegetstarted/image.png)

Sau khi tạo xong, ấn **View VPC**.
![alt text](./nodegetstarted/image-1.png)

Kiểm tra xem **Resource map** có giống như trên hình ảnh không.
Thế là tạo thành công **VPC** cho dự án.

### Tạo Security Group.
Truy cập [trang Security Group](https://ap-southeast-1.console.aws.amazon.com/vpcconsole/home?region=ap-southeast-1#SecurityGroups:) để tạo **Security Group** cho dự án.
![alt text](./nodegetstarted/image-2.png)

Chọn **Create security group**. Đặt tên **Security Group** và **Description** theo ý muốn bản thân. Sau đó phần **VPC** chọn cái vừa tạo lúc nãy.
![alt text](./nodegetstarted/image-3.png)


Phần **Inbound rules**, chọn **Add Rule**. Phần **Type** chọn *All trafic*, phần **Source** chọn *Anywhere-IPv4*. Làm thêm một cái nữa cho *Anywhere-IPv6*.
![alt text](./nodegetstarted/image-5.png)

> Không nên để cấu hình **Inbound Rules** như trên vì sẽ cho phép tất cả lưu lương internet truy cập vào dịch vụ AWS.

Phần **Outbound rules**, làm tương tự như trên.
![alt text](./nodegetstarted/image-6.png)

Kéo xuống dưới cuối trang, ấn **Create security group** để tạo **Security group**. Ẫn xong, ta sẽ có giao diện:
![alt text](./nodegetstarted/image-7.png)

Xong bước 1 là tạo **VPC**.

## Bước 2: Tạo EC2
### Tạo Key Pair để kết nối SSH
Truy cập [trang Key Pairs](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#KeyPairs:) để tạo **Key Pair**. Ấn **Create key pair**.
![alt text](./nodegetstarted/image-8.png)

Ta đặt tên cho **Key pair** rồi ấn **Create key pair**. Để cài đặt giống như ảnh.
![alt text](./nodegetstarted/image-42.png)

Trang web sẽ tải về cho ta một tệp tin chưa key. Ta sẽ sử dụng nó sau. Thế là xong bước tạo **Key pair**

### Khởi tạo EC2
Try cập [Trang Instances](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#Instances:v=3;$case=tags:true%5C,client:false;$regex=tags:false%5C,client:false) để tạo **EC2**. Sau khi truy cập, ta chọn **Launch instances**.
![alt text](./nodegetstarted/image-10.png)

#### Name and tags.
Phần này là phần đặt tên cho **EC2**. Ta có thể chọn tên gì mà ta muốn.
![alt text](./nodegetstarted/image-11.png)

#### Application and OS Images (Amazon Machine Image).
Phần này là nơi ta chọn hệ điều hành cho **EC2**, có thể là windows, linux hoặc ubuntu, tùy vào mục đích sử dụng của chúng ta. Bài tập này, mục đích sử dụng chính là để kết nối với **RDS** nên giữ nguyên là **Amazon Linux**. Phần **Amazon Machine Image**, chọn **Amazon Linux 2023 AMI**. Tiếp theo là **Architecture**, ta chọn **64-bit (x86)**.
![alt text](./nodegetstarted/image-12.png)

#### Instance type.
Phần này, ta sẽ chọn cấu hình phần cứng cho **EC2**. Ta sẽ sử dụng **t2.micro**.
![alt text](./nodegetstarted/image-13.png)

#### Key pair (login).
Phần **Key pair** giúp ta kết nối với **EC2** thông qua SSH. Ta sẽ sử dụng key tạo vừa nãy.
![alt text](./nodegetstarted/image-14.png)

#### Network settings.
Phần này cho ta cấu hình mạng của **EC2**. Ta chọn **Edit**.
1. **VPC**: chọn **VPC** tạo ở phần trên.
2. **Subnet**: chọn 1 trong 2 **Public Subnet**.
3. **Auto-assign public IP**: chọn **Enable** để hệ thống tự động gán địa chi IPv4 cho **EC2**.
4. **Firewall (security groups)**: chọn **Select existing security group**. Sau đó chọn **Security group** tạo ở trên.
![alt text](./nodegetstarted/image-16.png)

#### Configure storage.
Ta giữ nguyên, không cần thay đổi gì cả.
![alt text](./nodegetstarted/image-17.png)

#### Advanced details.
Ta cũng giữ nguyên.
![alt text](./nodegetstarted/image-20.png)

Sau khi chọn các cài đặt trên. Ta ấn **Launch instance**.
![alt text](./nodegetstarted/image-21.png)

Thế là xong bước tạo **EC2**.

## Bước 3: Tạo Amazon RDS
### Tạo cơ sở dữ liệu
Ta truy cập trang [Trang Amazon RDS](https://ap-southeast-1.console.aws.amazon.com/rds/home?region=ap-southeast-1) để tạo cơ sở dữ liệu. Sau khi truy cập, ta chọn **Create database**.
![alt text](./nodegetstarted/image-22.png)

#### Choose a database creation method
Ta chọn **Standard create**.
![alt text](./nodegetstarted/image-23.png)

#### Engine options
Ta chọn **MySQL**. Phần **Engine version**, ta chọn phiên bản **8.0.x**.
![alt text](./nodegetstarted/image-24.png)
![alt text](./nodegetstarted/image-25.png)

#### Templates
Ta chọn **Free tier**.
![alt text](./nodegetstarted/image-26.png)

#### Availability & durability
Ta không cần để ý.
![alt text](./nodegetstarted/image-29.png)

#### Settings
* **DB instance identifier**: ta đặt tên theo ý muốn.
* **Credentials Settings**: (tự chọn)
  * Master username: admin
  * Master password: admin123

![alt text](./nodegetstarted/image-27.png)

#### Instance configuration
Ta giữ nguyên cài đặt của Amazon.
![alt text](./nodegetstarted/image-28.png)


#### Storage
Ta giữ nguyên cài đặt.
![alt text](./nodegetstarted/image-30.png)

#### Connectivity 
* **Compute resource**: chọn **Connect to an EC2 compute resource**
* **EC2 instance**: chọn **EC2** vừa tạo ban nãy.
* **VPC security group (firewall)**: chọn **security group** tạo ở phần **VPC**.
* **Còn lại**: giữ nguyên.

![alt text](./nodegetstarted/image-31.png)
![alt text](./nodegetstarted/image-32.png)
![alt text](./nodegetstarted/image-33.png)

#### Tags - optional
Ta giữ nguyên.
![alt text](./nodegetstarted/image-34.png)

#### Database authentication
Ta giữ nguyên.
![alt text](./nodegetstarted/image-35.png)

#### Monitoring
Ta giữ nguyên.
![alt text](./nodegetstarted/image-36.png)

#### Additional configuration
Ta giữ nguyên.
![alt text](./nodegetstarted/image-37.png)

Sau đó ta ấn **Create database** và chờ nó tạo xong.

### Kết nối với RDS thông qua MySQL Workbench
Để tiếp tục, yêu cầu có **MySql Workbench** cài đặt trên máy tính. Nếu chưa có thì cài đặt. Nếu đã cài đặt, ta sẽ mở nó ra và thiết lập kết nối với **RDS** trên AWS. Mở ra, cạnh **MySQL Connections**, ta chọn nút **+**.
![alt text](./nodegetstarted/image-38.png)

Nó sẽ hiện thị ra một cửa số. Ở chỗ **Connection Method**, chọn **Standard TCP/IP over SSH**

**SSH Hostname** là địa chỉ IP của **EC2** thiết lập ban nãy. Ta sao chép ở **Public IPv4 address**.<br>
![alt text](./nodegetstarted/image-40.png)

**SSH Username** là **ec2-user**<br>
**SSH Password** ta bỏ qua.<br>
**SSH Key File** ta sẽ điền địa chỉ file **key pair** ta tải về ở bước trước.<br>
**MySql Hostname** là endpoint của **RDS**.<br>
**MySql Server Port** là cổng của **RDS**.<br>
**Username** là tên ta đặt ở phần cài đặt **RDS**.<br>
Sau khi cài đặt, ta sẽ có bảng thông tin như sau:
![alt text](./nodegetstarted/image-43.png)

Sau đó ta điền mật khẩu và tạo kết nối. Tiếp theo mở file thiết lập cơ sở dữ liệu chứa trong thư mục database và chạy nó.
![alt text](./nodegetstarted/image-45.png)

Sau bước này là ta đã hoàn thành thiết lập cơ sở dữ liệu.
![alt text](./nodegetstarted/image-47.png)

## Bước 4: Tạo Lambda Function
### Tạo Lambda Layer
Bước này giúp ta có thể thêm các dependencies cần thiết của **Lambda Function**.

#### Chuẩn bị mã nguồn cho **Layer**
Ta truy cập [trang Lambda Function](https://ap-southeast-1.console.aws.amazon.com/lambda/home?region=ap-southeast-1#/layers). Ta chọn **Create layer**.
 ![alt text](./nodegetstarted/image-48.png)

Tùy vào môi trường ta dùng để code mà sẽ có cách thêm **layer** khác nhau. Ta có thể tham khảo thêm ở [trang này](https://docs.aws.amazon.com/lambda/latest/dg/packaging-layers.html). Ở dự án này, ta sẽ xử dùng nodejs để phát triển trên **Lambda Function**. <br>

Truy cập folder chứa mã nguồn của **Lambda Function**
![alt text](./nodegetstarted/image-49.png)

Ta tạo một tệp mới tên là **nodejs** và sao chép tệp **node_modules** và đặt nó vào trong tệp **nodejs** vừa tạo. Sau đó ta nén lại thành file zip. Folder sẽ có dạng <br>
**nodejs.zip**
  * nodejs/
    * node_modules/
      * dependenccies1/
      * dependenccies2/
      * ...
      * dependencciesN/

![alt text](./nodegetstarted/image-50.png)

Thế là hoàn thành bước đầu tiên.

#### Tạo **layer**.
Ta quay lại trang trên. Ta chọn **Create layer**.

**Name**: ta đặt tên cho **layer**.<br>
**Upload**: ta chọn **Upload a .zip file** rồi ấn **Upload** và tải file zip trên lên.<br>
**Compatible architectures - optional**: ta chọn **x86_64**.<br>
**Compatible runtimes - optional**: ta chọn **Node.js 20.x**.<br>
Sau đó ta ấn **Create**.
![alt text](./nodegetstarted/image-53.png)

### Tạo Lambda Funciton
Ta truy cập [trang Lambda Function](https://ap-southeast-1.console.aws.amazon.com/lambda/home?region=ap-southeast-1#/functions) và chọn **Create function**.
![alt text](./nodegetstarted/image-54.png)

#### Khởi tạo Function.
Chọn **Author from scratch**. <br>
**Function name**: ta đặt tên cho function.
**Runtime**: ta chọn **Node.js 20.x**.
**Architecture**: ta chọn **x86_64**. <br>
**Change default execution role**: ta không thay đổi gì cả.
![alt text](./nodegetstarted/image-55.png)

**Additional Configurations**
  * **Enable VPC**:
    * VPC: chọn VPC ta vừa tạo ở bước trên.
    * Subnets: chọn 4 cái **subnet** ta tạo ban đầu.
    * Security groups: chọn cái **security group** ta tạo ban đầu.

![alt text](./nodegetstarted/image-56.png)
![alt text](./nodegetstarted/image-57.png)

Sau đó ta ấn **Create function**.

#### Chuẩn bị mã nguồn cho Function.
Ta ấn vào **Layers**, trang web sẽ điều hướng ta đến phần **Layers**. Ta chọn **Add a layer**. 
![alt text](./nodegetstarted/image-58.png)
![alt text](./nodegetstarted/image-59.png)

Ở đây, ta chọn **Custom layers**, chọn **layers** ta vừa tạo ban nãy. Chọn **version** đầu tiên. Sau đó chọn **Add**.
![alt text](./nodegetstarted/image-60.png)

Ở phần trên, ta chọn **Upload from** và chọn **.zip file**. Sau đó ta chọn tệp .zip chứa mã nguồn của lambda function. 
![alt text](./nodegetstarted/image-62.png)

Tiếp theo, ta chọn **Configuration** và chọn **Environment variables**.
![alt text](./nodegetstarted/image-63.png)
  
Sau đó ta chọn **Edit** rồi ấn **Add environment variable**.
![alt text](./nodegetstarted/image-64.png)

Ta điền tương ứng **key** với **value** sau:
- db_host: \<endpoint RDS\>
- db_user: admin
- db_password: admin123
- db_database: btl

![alt text](./nodegetstarted/image-65.png)

### Kết nối Lambda Function với Amazon RDS
Ta quay lại trang **RDS**, tìm cơ sở dữ liệu vừa tạo ban nãy. Tìm phần **Connected compute resources** và chọn **Actions**, chọn **Set up Lambda connection**.
![alt text](./nodegetstarted/image-66.png)

**Select Lambda function**
- Chọn **Choose existing function**.
- Chọn **Lambda Function** tạo ở trên.

![alt text](./nodegetstarted/image-67.png)

**RDS Proxy**
Chọn như ở ảnh: (**password** là *admin123*)
![alt text](./nodegetstarted/image-68.png)

**Connection summary** là giải thích các bước AWS thực hiện để kết nối với **Lambda**. Có thể đọc để hiểu hơn.
![alt text](./nodegetstarted/image-69.png)

Ta chọn **Set up** để tạo kết nối.

### Kiểm tra kết nối
Ta quay lại trang chứa thông tin **Lambda Funciton** ta tạo lúc nãy.
![alt text](./nodegetstarted/image-70.png)

Ta chọn **Test** và chọn **Configure test event**. Nó sẽ hiện thị giao diện:
![alt text](./nodegetstarted/image-71.png)

Ta thêm dòng code sau vào trong **Event JSON**.
```
{
  "body-json": {},
  "params": {
    "path": {},
    "querystring": {
      "table": "rom"
    },
    "header": {}
  },
  "stage-variables": {},
  "context": {
    "http-method": "GET",
    "resource-path": "/thuoc-tinh"
  }
}
```
Sau đó ta ấn **Invoke**.
![alt text](./nodegetstarted/image-72.png)

Nếu nó hiện thị kết quả sau thì là đã thành công:
![alt text](./nodegetstarted/image-74.png)

## Bước 4: Tạo Amazon API Gateway
### Tạo Restful API
#### Khởi tạo API
Truy cập [trang API Gateway](https://ap-southeast-1.console.aws.amazon.com/apigateway/main/precreate?region=ap-southeast-1), chọn **Build** ở **REST API**.
![alt text](./nodegetstarted/image-75.png)
![alt text](./nodegetstarted/image-76.png)

Chọn **New API**.<br>
**API name**: đặt tên cho API.<br>
**API endpoint type**: chọn **Regional**.<br>
Sau đó ấn **Create API**.
![alt text](./nodegetstarted/image-77.png)

Ta sẽ có giao diện sau:
![alt text](./nodegetstarted/image-78.png)


#### Khởi tạo resource
Ta chọn **Create resource**. Chọn tên cho đường dẫn, ở đây ta đặt tên là *thuoc-tinh*. Sau đó bật **CORS (Cross Origin Resource Sharing)**. Sau đó chọn **Create resource**.
![alt text](./nodegetstarted/image-81.png)

Sau khi tạo xong **resource** trên, ta làm tương tự với 2 **resource** *san-pham* và *cau-hinh*.
![alt text](./nodegetstarted/image-82.png)


#### Khởi tạo method
Ở **thuoc-tinh**, ta chọn **Create method**.
![alt text](./nodegetstarted/image-84.png)

Ta sử dụng các cài đặt sau:
- **Method type**: **GET** <br>
- **Integration type**: **Lambda function** <br>
- **Lambda function**: **Lambda Function** tạo ở bước trước. <br>
- **Integration timeout**: giữ nguyên. <br>
- **Method request settings**: giữ nguyên. <br>
- **URL query string parameters**: giữ nguyên. <br>
- **HTTP request headers**: giữ nguyên. <br>
- **Request body**: giữ nguyên. <br>

Sau đó chọn **Create method**.
![alt text](./nodegetstarted/image-85.png)
![alt text](./nodegetstarted/image-88.png)

Ta chọn **Get** ở phần **/thuoc-tinh**, chọn **Integration request**, chọn Edit.
![alt text](./nodegetstarted/image-90.png)

Thay đổi ở:<br>
- **Request body passthrough**: chọn **When there are no templates defined (recommended)**.<br>
- **Mapping templates**:
  1. Chọn **Add mapping template**.
  2. **Content type**: **application/json**.
  3. **Generate template**: **Method request passthrough**.<br>

Sau đó ấn **Save**.
![alt text](./nodegetstarted/image-91.png)
![alt text](./nodegetstarted/image-92.png)

Ta vào **Test**. Phần **Query strings** đánh **table=rom**.
![alt text](./nodegetstarted/image-93.png)

Nếu kết quả chạy ra như thế này thì thành công:
![alt text](./nodegetstarted/image-94.png)

```
{
  "body": [
    {
      "ma": "a",
      "ten": "4GB",
      "trangthai": 1
    },
    {
      "ma": "b",
      "ten": "8GB",
      "trangthai": 1
    },
    {
      "ma": "c",
      "ten": "12GB",
      "trangthai": 1
    }
  ],
  "message": "Success",
  "event": {
    "body-json": {},
    "params": {
      "path": {},
      "querystring": {
        "table": "rom"
      },
      "header": {}
    },
    "stage-variables": {},
    "context": {
      "account-id": "688567306327",
      "api-id": "lb4dviezfc",
      "api-key": "test-invoke-api-key",
      "authorizer-principal-id": "",
      "caller": "688567306327",
      "cognito-authentication-provider": "",
      "cognito-authentication-type": "",
      "cognito-identity-id": "",
      "cognito-identity-pool-id": "",
      "http-method": "GET",
      "stage": "test-invoke-stage",
      "source-ip": "test-invoke-source-ip",
      "user": "688567306327",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
      "user-arn": "arn:aws:iam::688567306327:root",
      "request-id": "4d18e1d2-5178-4362-a9c8-66babe73c9d3",
      "resource-id": "lwg4xg",
      "resource-path": "/thuoc-tinh"
    }
  }
}
```

Làm tương tự với các **Method** **PUT** , **POST**, **DELETE**. Sau khi xong, ta sẽ có giao diện:
![alt text](./nodegetstarted/image-96.png)

Sau đó ta chọn **/thuoc-tinh**, chọn **Enable CORS**.
![alt text](./nodegetstarted/image-97.png)

Cài đặt:
- **Access-Control-Allow-Methods**: ta chọn hết.
- **Additional settings**
  - **Access-Control-Allow-Credentials**: chọn cái này.

Sau đó, ta ấn **Save**.
![alt text](./nodegetstarted/image-98.png)
![alt text](./nodegetstarted/image-100.png)

Sau đó, ta kiểm tra theo thứ tự: **PUT**, **POST**, **DELETE**.<br>
Để kiểm tra hàm có hoạt động không, paste code dưới đây vào **Request body**, **Query strings** để `table=rom`


|     PUT             |       POST                   |DELETE              |
|-----------|-----------|--------------------|
| {    "ten": "test"} | {    "ma":"a",    "ten":"6GB"} | {    "ma":"a"} |

Làm tương tự với các **resource** trên. Sau khi hoàn thành:
![alt text](./nodegetstarted/image-101.png)

Sau đó, ta ấn **Deploy API**. <br>
- Ở **Stage**, chọn **\*New stage\***.
- **Stage name**: đặt tên mình muốn.

![alt text](./nodegetstarted/image-102.png)

Hoàn thành ta sẽ có như dưới. Ta copy Invoke URL và đặt nó vào trong dự án code.
![alt text](./nodegetstarted/image-103.png)

## Bước 5: Tạo S3 Bucket
### Tạo S3 bucket
Vào [trang S3](https://ap-southeast-1.console.aws.amazon.com/s3/get-started?region=ap-southeast-1) để tạo một S3 bucket mới. Chọn **Create bucket**.
![alt text](./nodegetstarted/image-104.png)

Các cài đặt ta sử dụng:
- **Bucket name**: userID-\<tên bucket\> (688567306327-project).
- **Object Ownership**: **ACLs disabled (recommended)**.
- **Block Public Access settings for this bucket**: tắt **Block all public access**.

Các cái không đề cập thì sẽ giữ nguyên.
![alt text](./nodegetstarted/image-105.png)
![alt text](./nodegetstarted/image-106.png)
![alt text](./nodegetstarted/image-107.png)
![alt text](./nodegetstarted/image-108.png)
![alt text](./nodegetstarted/image-109.png)

Sau khi tạo xong, ta truy cập vào bucket.
![alt text](./nodegetstarted/image-110.png)

Chọn **Upload** và tải code trang web lên trên bucket.
![alt text](./nodegetstarted/image-111.png)

Sau khi ấn upload và tải tệp tin lên, ta ấn **Upload**:
![alt text](./nodegetstarted/image-113.png)

Sau khi tải xongn, ta vào phần **Properties**, kéo xuống cuối và chọn **Static website hosting**. Chọn **Edit**
![alt text](./nodegetstarted/image-114.png)

Sau đó, ta để các cài đặt sau:
- **Static website hosting**: chọn **Enable**.
- **Hosting type**: **Host a static website**.
- **Index document**: **index.html**
- **Error document**: **index.html**

Sau đó ấn **Save changed**.
![alt text](./nodegetstarted/image-115.png)


Sang **Permissions**, ta tìm **Bucket policy**, Ấn **Edit**.
![alt text](./nodegetstarted/image-116.png)

Ấn **Add new statement**.
![alt text](./nodegetstarted/image-117.png)

Ta điền code ở dưới rồi ấn **Save changes**

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Statement1",
			"Principal": "*",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject"
			],
			"Resource": [
		    "arn:aws:s3:::688567306327-project/*"
			]
		}
	]
}
```

Sau bước trên, ta có thể truy cập trang web thông qua url cung cấp ở chỗ **Properties**, **Static website hosting**
![alt text](./nodegetstarted/image-118.png)

## Bước 6: Tạo Amazon CloudFront

Truy cập [CloudFront](https://us-east-1.console.aws.amazon.com/cloudfront/v4/home?region=ap-southeast-1#/welcome), chọn **Create a CloudFront distribution**.
![alt text](./nodegetstarted/image-119.png)

Các cài đặt:
- **Origin domain**: link lấy ở **S3**, **Static website hosting**.
- **Enable Origin Shield**: **Yes** (ap-southeast-1).
- **Default cache behavior**:
  - **Viewer protocol policy**: **Redirect HTTP to HTTPS**.
  - **Allowed HTTP methods**: **GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE**.
- **Web Application Firewall (WAF)**: **Do not enable security protections**.
- **Settings**:
  - **Default root object**: **index.html**.

Sau đó ấn **Create Distribution**




## Bước 7: Kiểm tra chức năng trang web