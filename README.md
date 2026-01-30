# Morning News (Web)

> "Noise Off, Context On."

Đây là kho lưu trữ Landing Page của Morning News, một dịch vụ tuyển chọn tin tức giúp tắt đi tiếng ồn của thế giới và chỉ giữ lại bối cảnh cấu trúc.

## 🏗 Architecture

Dự án này đảm nhận vai trò **Frontend (Consumer)** trong cấu trúc kho lưu trữ kép (Dual Repository) của Morning News.

- **Role**: Điểm tiếp xúc người dùng (Landing Page), xử lý đăng ký/hủy đăng ký.
- **Backend Repo**: Morning-News-Worker (Phụ trách thu thập và gửi tin tức)
- **Database**: Supabase (Tài nguyên chia sẻ)

## ✨ Features

### Landing Page (`/`)

- **Digital Brutalism Design**: Nhấn mạnh tính chân thực chỉ bằng văn bản và bố cục mà không có hình ảnh.
- **Subscription Form**: Lưu dữ liệu người đăng ký theo thời gian thực vào Supabase DB (INSERT).
- **Performance**: Trang lai tĩnh/động được tối ưu hóa cho việc triển khai Vercel.

### Unsubscribe Page (`/unsubscribe`)

- Truy cập thông qua liên kết ở Footer email.
- Xử lý vô hiệu hóa trạng thái đăng ký (`UPDATE is_active = false`).

## 🛠 Tech Stack

| Category        | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 14 (App Router) |
| Styling         | Tailwind CSS            |
| Language        | TypeScript              |
| Database Client | @supabase/supabase-js   |
| Deployment      | Vercel                  |
