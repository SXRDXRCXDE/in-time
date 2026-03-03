# Проверка переводов новых страниц

## Сводка

| Язык | Файл | Статус |
|------|------|--------|
| **EN** (English) | `pages-en.json` | ✅ Все ключи на месте |
| **RU** (Русский) | `pages-ru.json` | ✅ Все ключи на месте |
| **HE** (עברית) | `pages-he.json` | ✅ Все ключи на месте |
| **CS** (Čeština) | — | ⚠️ Отдельного файла нет, используется `pages-en.json` (контент страниц на английском) |

---

## Соответствие страниц и разделов переводов

| Страница | Маршрут | Раздел в `pages-*.json` | EN | RU | HE |
|----------|--------|-------------------------|----|----|-----|
| ContactPage | `/contact` | `kontakt` | ✅ | ✅ | ✅ |
| AboutPage | `/about` | `oNas` | ✅ | ✅ | ✅ |
| WebDevelopmentPage | `/web-development` | `tvorbaWebovychStranek` | ✅ | ✅ | ✅ |
| WebsiteCostPage | `/website-cost` | `cenaWebu` | ✅ | ✅ | ✅ |
| CrmPage | `/crm` | `crm` | ✅ | ✅ | ✅ |
| ChatbotsPage | `/chatbots` | `chatbots` | ✅ | ✅ | ✅ |
| WebAppDevelopmentPage | `/web-app-development` | `vyvojAplikaci` | ✅ | ✅ | ✅ |
| BlogPage | `/blog` | `blog` | ✅ | ✅ | ✅ |
| BlogPostPage | `/blog/:slug` | `blog.posts.*` | ✅ | ✅ | ✅ |

---

## Структура разделов (одинакова во всех трёх файлах)

- **kontakt** — контактная форма (title, intro, поля, плейсхолдеры, submit, toast).
- **oNas** — о нас (h1, intro, whyTitle, why1–3, teamTitle, member1/2 Name/Role/Bio, ctaTitle, ctaP, ctaBtn).
- **tvorbaWebovychStranek** — создание сайтов (h1, intro, why*, process*, types*, prices*, cases*, faq*, cta*).
- **cenaWebu** — стоимость сайта (h1, intro, packagesTitle, table*, pkg1–3*, feat1–12, included*, extra*, calc*, keywords).
- **crm** — CRM (h1, intro, whyTitle, whyP, card1–4Title/Desc, offer1–4, caseTitle, caseP1–2, cta*).
- **chatbots** — чат-боты (h1, intro, why*, card1–4*, where1–3, caseTitle, caseP, cta*).
- **vyvojAplikaci** — веб-приложения (h1, intro, stackTitle, stackP, stack1–4, integrate*, security*, support*, cta*).
- **blog** — блог (title, intro, backToBlog, notFound, posts с 8 статьями: title, excerpt, body, category).

---

## Рекомендация по чешскому (CS)

Сейчас в `i18n.ts` для языка **cs** подставляется объект `pages` из **pages-en.json**, поэтому все новые страницы на чешском интерфейсе показывают английский контент.

Если нужны полноценные чешские тексты для этих страниц:

1. Создать файл `pages-cs.json` по образцу `pages-en.json` и заполнить чешские переводы.
2. В `i18n.ts` добавить:  
   `import pagesCs from './locales/pages-cs.json';`  
   и в `resources` задать:  
   `cs: { translation: { ...cs, pages: pagesCs } }`.

После этого проверка переводов для CS будет такой же, как для EN/RU/HE (все ключи из этого отчёта должны быть в `pages-cs.json`).
