# Project: Morning News (News Noise Canceling)

## 1. Project Overview

- **Description:** Dịch vụ tuyển chọn email giúp chặn tin tức bán sự lo lắng, thay vào đó bán sự an tâm và cái nhìn sâu sắc.
- **Core Value:** "Tắt tiếng ồn thế giới, chỉ giữ lại bối cảnh cấu trúc (Noise Off, Context On)."
- **Target Audience:** Những cá nhân mệt mỏi với thông tin kích thích nhưng có nhu cầu tri thức không muốn bỏ lỡ dòng chảy của thế giới.
- **Platform:**
  - **Landing:** Web (Next.js) - Giới thiệu triết lý và đăng ký.
  - **Service:** Daily Email Newsletter - Tự động gửi lúc 7 giờ sáng mỗi ngày.

---

## 2. Core Philosophy (Based on Peter Wessel Zapffe)

1. **Isolation (Cô lập):**

   - AI chặn trước các 'thông tin độc hại (Toxic Info)' như giết người, tội phạm tình dục, tin đồn giải trí, phỉ báng chính trị.
   - Cung cấp cảm giác hiệu quả: "Hôm nay bạn đã được bảo vệ khỏi 300 tin tức rác".

2. **Anchoring (Neo đậu):**
   - Trung hòa (Neutralize) các tiêu đề câu view gây lo lắng bằng 'sự thật khô khan'.
   - Nhóm các thông tin phân mảnh theo cấu trúc [Hiện tượng - Bối cảnh - Hàm ý] để mang lại cảm giác kiểm soát trí tuệ cho độc giả.

---

## 3. Architecture & Tech Stack (Updated)

> **Kiến trúc Producer-Consumer** tách biệt giữa "Cửa hàng (Frontend)" và "Nhà máy (Backend)".

### 3.1 Repository Structure (Dual Repo)

| Phân loại | Vai trò          | Tên kho lưu trữ (Ví dụ) | Công nghệ             | Môi trường triển khai |
| --------- | ---------------- | ----------------------- | --------------------- | --------------------- |
| Consumer  | Frontend (Web)   | Morning-News-Web          | Next.js, Tailwind CSS | Vercel (Serverless)   |
| Producer  | Backend (Worker) | Morning-News-Worker       | NestJS (Standalone)   | GitHub Actions (Cron) |
| Storage   | Database         | (Tài nguyên chung)      | Supabase (PostgreSQL) | Cloud Hosted          |

### 3.2 Detailed Stack

**Frontend (Web):**

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Digital Brutalism Design)
- **Auth/DB:** `@supabase/supabase-js` (Sử dụng Anon Key)

**Backend (Worker):**

- **Framework:** NestJS (Standalone Mode cho xử lý hàng loạt)
- **Scraping:** `rss-parser` (Google News), `cheerio` (Nội dung)
- **AI Engine:** Gemini API (`gemini-2.5-flash`)
- **Email:** `nodemailer` (Gmail SMTP)
- **DB Access:** Supabase Client (Sử dụng Service Role Key - Bỏ qua RLS)

### 3.3 End-to-End System Flow

1. **Subscribe (Web):** Người dùng truy cập trang đích -> Nhập email -> Supabase INSERT (Next.js).
2. **Trigger (Worker):** 07:00 KST mỗi ngày, GitHub Actions chạy NestJS worker.
3. **Fetch Users:** SELECT danh sách người đăng ký có `is_active: true` từ Supabase.
4. **Collect Data:** Thu thập Google News RSS (Kinh doanh, Công nghệ, Chính sách, Xã luận).
5. **AI Process:**
   - **Filter:** Loại bỏ tin tức độc hại (giết người, phỉ báng, v.v.).
   - **Detox:** Trung hòa tiêu đề và tóm tắt [Sự kiện - Bối cảnh - Hàm ý].
   - **Synthesis:** Phân tích tổng hợp xã luận trái chiều/phải chiều (Cấu trúc Chính-Phản-Hợp).
6. **Send:** Gửi email HTML qua Nodemailer (Bao gồm liên kết hủy đăng ký ở Footer).
7. **Unsubscribe (Web):** Người dùng nhấp vào liên kết ở cuối email -> Trang ẩn Next.js xử lý `UPDATE is_active = false`.

---

## 4. Database Strategy (Supabase)

### 4.1 Schema

#### `public.subscribers` (Người đăng ký)

```sql
create table public.subscribers (
  id uuid not null default gen_random_uuid (),
  email text not null,
  is_active boolean not null default true, -- Trạng thái đăng ký (Soft Delete)
  created_at timestamp with time zone not null default now(),
  constraint subscribers_pkey primary key (id),
  constraint subscribers_email_key unique (email)
);
```

#### `public.newsletters` (Bản tin)

```sql
create table public.newsletters (
  id uuid not null default gen_random_uuid (),
  title text not null,                      -- Tiêu đề bản tin
  content_html text not null,               -- Nội dung HTML để gửi
  content_data jsonb not null,              -- Dữ liệu gốc (JSON)
  send_date date not null,                  -- Ngày gửi
  created_at timestamp with time zone not null default now(),
  constraint newsletters_pkey primary key (id)
);
```

### 4.2 Functions

```sql
-- Truy vấn số lượng người đăng ký đang hoạt động
create function public.get_subscriber_count()
returns integer as $$
  select count(*)::integer from public.subscribers where is_active = true;
$$ language sql stable;
```

### 4.3 Security Policy (RLS)

- **Frontend (Anon Key):** Chỉ INSERT. (Bất kỳ ai cũng có thể đăng ký, không thể truy vấn)
- **Backend (Service Role Key):** SELECT, UPDATE tất cả. (Truy cập tất cả dữ liệu)

---

## 5. Key Features (Content Structure)

### Part 1. Protection Log (Nhật ký bảo vệ)

- **Mục đích:** Trực quan hóa sự cô lập (Isolation).
- **Hình thức:**
  > "Hôm nay AI đã quét tổng cộng 2.450 tin, chặn **120 tin giết người/tội phạm, 340 tin phỉ báng chính trị**."

### Part 2. Headline Detox & Micro-Briefing (Trung hòa tin tức)

- **Mục đích:** Anchoring. Hiểu bối cảnh mà không cần nhấp chuột.
- **Cấu trúc:**
  - **[AI Chỉnh sửa]** Samsung Electronics ghi nhận mức thấp mới trong 52 tuần do suy thoái ngành (Giọng điệu khô khan)
  - **3-Line Insight:** Sự kiện / Bối cảnh / Hàm ý

### Part 3. Editorial Synthesis (Tổng hợp xã luận)

- **Mục đích:** Loại bỏ thiên kiến và nắm bắt các vấn đề cấu trúc.
- **Logic:** Khớp xã luận Bảo thủ vs Tiến bộ -> AI viết báo cáo **[Vấn đề - Lập luận hai bên - Bản chất cấu trúc]**.

### Part 4. Hidden Feature (Unsubscribe)

- **Mục đích:** Tôn trọng ý chí tự do của người dùng và ngăn chặn xử lý spam.
- **Triển khai:** Cung cấp liên kết từ chối nhận riêng lẻ ở Footer email -> Liên kết đến trang `/unsubscribe` của Next.js.

---

## 6. Data & AI Strategy

### 6.1 Data Collection

- **Source:** Google News RSS (Topics + Custom Queries)
- **Libraries:** `rss-parser`, `axios`, `cheerio`
- **Constants:** Sử dụng RSS URL được định nghĩa trong `constants.ts`.

### 6.2 AI Prompt Engineering (Gemini 2.5 Flash)

- **Role 1 (Filter/Detox):** Phân biệt `isToxic` và viết lại tiêu đề khô khan.
- **Role 2 (Synthesis):** Phân tích so sánh xã luận. Xóa từ ngữ cảm xúc, trích xuất vấn đề logic.

### 6.3 Gemini API Limits (Free Tier)

| Mục hạn chế            | Giá trị |
| ---------------------- | ------- |
| Số yêu cầu tối đa/phút | 5       |
| Số token đầu vào tối đa/phút | 250k    |
| Số yêu cầu tối đa/ngày | 20      |

© 2025 Morning News. All rights reserved.
