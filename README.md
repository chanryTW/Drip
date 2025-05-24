# Drip - 醫療資訊系統 [已棄用/DEPRECATED]

## 專案簡介
這是一個基於 Ionic Framework 開發的醫療資訊系統移動應用程式，整合了 Firebase 後端服務，提供使用者友善的醫療資訊管理介面。

## 技術架構
- 前端框架：Ionic Framework
- 後端服務：Firebase
- 資料庫：Firebase Realtime Database
- 使用者認證：Firebase Authentication
- 其他技術：
  - jQuery 3.2.1
  - Bootstrap Grid System
  - AngularJS

## 功能特點
- 響應式設計，支援各種移動設備
- 使用者認證系統
- 即時數據同步
- 醫療資訊管理

## 專案結構
```
.
├── css/                # 樣式文件
├── img/                # 圖片資源
├── js/                 # JavaScript 文件
│   ├── app.js         # 應用程式主文件
│   ├── controllers.js # 控制器
│   ├── routes.js      # 路由配置
│   ├── services.js    # 服務
│   └── directives.js  # 指令
├── lib/                # 第三方庫
├── templates/          # HTML 模板
└── index.html         # 主頁面
```

## Firebase 配置
使用前更新 Firebase 配置信息：
```javascript
var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};
```

## 注意事項
- 請確保 Firebase 配置正確
- 開發時請遵循 Ionic 最佳實踐
- 建議使用最新版本的瀏覽器進行測試

## 版本資訊
- 最新版本：1.0.0
- 上次更新：2023.12.22