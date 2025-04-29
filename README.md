# History slider

Проект представляет собой анимированный слайдер, адаптированный для мобильных устройств.

## Ссылка на live version

- https://history-slider.vercel.app/

## Технологии

- **React 19** – основа приложения
- **GSAP** – анимации
- **Swiper** – работа со слайдером
- **Webpack v5** – сборка
- **TypeScript** – типизация
- **SASS** – стилизация

## Установка и запуск

1. Скачайте zip или клонируйте репозиторий:

   ```sh
   git clone https://github.com/Simon-Skorentsev/history-slider.git
   ```

2. Установите зависимости:

- Если есть bun:

  ```sh
  bun install
  ```

- Если нет:

  ```sh
  yarn install
  ```

3. Запустите приложение в режиме разработки (по завершению запуска приложение откроется в новом окне браузера):

   ```sh
   yarn run start
   ```

## Структура проекта

```
📂 src
├── 📂 components                // Компоненты приложения
│   ├── 📂 HistoricalDates       // Основной компонент слайдера
│   │   ├── 📂 CarouselControls  // Элементы управления каруселью
│   │   ├── 📂 EventsSlider      // Слайдер для событий исторического периода
│   │   └── 📂 HistoryPeriod     // Компонент для отображения активного периода истории
│   ├── 📂 layout                // Все компоненты, связанные с макетом приложения
│   └── 📂 ui                    // UI-компоненты
├── 📂 config                    // Конфигурация приложения
├── 📂 context                   // React контексты
├── 📂 hooks                     // Пользовательские React-хуки
└── 📂 utils                     // Утилиты и вспомогательные функции
```

## Ссылка на макет

- https://www.figma.com/design/YXCbNT4Jf9INk62BKTZw1z/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5

## Возможные вопросы

- Почему Webpack, почему не next?
- - Так нужно по тз: https://docs.google.com/document/d/1Qy4MN7duYzm-Wr-rQ4TFApvUoxfuqGXdcyA8-vt5Dhg/edit
