# NoCan News (Web)

> "Noise Off, Context On."

세상의 소음은 끄고, 구조적 맥락만 남기는 뉴스 큐레이션 서비스, NoCan News의 랜딩 페이지 리포지토리입니다.

## 🏗 Architecture

이 프로젝트는 NoCan News의 이중 저장소(Dual Repository) 구조 중 **Frontend(Consumer)**를 담당합니다.

- **Role**: 사용자 접점 (Landing Page), 구독 신청/해지 처리.
- **Backend Repo**: NoCan-News-Worker (뉴스 수집 및 발송 담당)
- **Database**: Supabase (Shared Resource)

## ✨ Features

### Landing Page (`/`)

- **Digital Brutalism Design**: 이미지 없이 텍스트와 레이아웃만으로 진정성 강조.
- **Subscription Form**: Supabase DB에 실시간 구독자 데이터 적재 (INSERT).
- **Performance**: Vercel 배포에 최적화된 정적/동적 하이브리드 페이지.

### Unsubscribe Page (`/unsubscribe`)

- 이메일 Footer 링크를 통해 접근.
- 구독 상태를 비활성화 처리 (`UPDATE is_active = false`).

## 🛠 Tech Stack

| Category        | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 14 (App Router) |
| Styling         | Tailwind CSS            |
| Language        | TypeScript              |
| Database Client | @supabase/supabase-js   |
| Deployment      | Vercel                  |
