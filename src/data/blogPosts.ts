export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  body?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kolik-stoji-tvorba-webu",
    title: "Kolik stojí tvorba webu v roce 2025",
    excerpt: "Orientační ceny za firemní weby, landing page a e-shopy. Co ovlivňuje rozpočet a jak získat nabídku na míru.",
    date: "2025-02-15",
    readTime: "5 min",
    category: "Tvorba webu",
    body: "Cena webu závisí na rozsahu: jednoduchá landing page vyjde řádově na stovky eur, firemní web s několika sekcemi na tisíc až tři tisíce, e-shop a složitější projekty od tří tisíc výše. Důležité je definovat počet stránek, potřebu CMS, integrace (formuláře, platební brána) a zda chcete design na míru. Doporučujeme požádat o cenovou nabídku s konkrétním popisem — většina studií ji připraví zdarma.",
  },
  {
    slug: "vyhledavani-firemniho-webu-seo",
    title: "Jak dostat firemní web do vyhledávání (SEO základy)",
    excerpt: "Základní kroky pro optimalizaci webu pro vyhledávače: struktura, klíčová slova, rychlost a obsah.",
    date: "2025-02-10",
    readTime: "6 min",
    category: "SEO",
    body: "Základem je sémantická struktura (nadpisy H1–H6), unikátní meta popisky a titulky stránek. Rychlost načítání a mobilní zobrazení Google přímo hodnotí. Důležitý je kvalitní obsah odpovídající dotazům uživatelů — klíčová slova přirozeně v textech, ne jen v metadatech. Pravidelná aktualizace a interní odkazy pomáhají. Pro lokální firmy má smysl vyplnit údaje v Google Mé firmy.",
  },
  {
    slug: "crm-pro-male-firmy",
    title: "CRM pro malé firmy: kdy má smysl a co vybrat",
    excerpt: "Kdy investovat do CRM, jak vybrat systém a co očekávat od integrace s webem a e-mailem.",
    date: "2025-02-05",
    readTime: "4 min",
    category: "CRM",
    body: "CRM má smysl, když máte víc než pár obchodních kontaktů a potřebujete přehled o stavu obchodů a komunikaci. Pro malé firmy často stačí cloud řešení (Pipedrive, HubSpot, atd.) s jednoduchou integrací na web — formuláře posílají leady přímo do CRM. Při výběru zvažte počet uživatelů, potřebu reportů a propojení s e-mailem a účetnictvím.",
  },
  {
    slug: "telegram-bot-pro-obchod",
    title: "Telegram bot pro obchod a objednávky",
    excerpt: "Případová studie: jak bot zjednodušil příjem objednávek a ušetřil hodiny administrace týdně.",
    date: "2025-01-28",
    readTime: "5 min",
    category: "Chatboti",
    body: "V jednom z našich projektů firma přijímala objednávky přes WhatsApp a e-maily — chaos a chyby. Telegram bot s menu a strukturovanými kroky umožnil zákazníkům vybrat produkty a termín; řidiči dostali sestavené faktury a trasy. Výsledek: přes 1 500 aktivních uživatelů, výrazně méně chyb a úspora několika hodin denně. Podobné scénáře lze nasadit i pro B2B a služby.",
  },
  {
    slug: "mvp-vyvoj-aplikace",
    title: "MVP vývoj aplikace — od nápadu k první verzi",
    excerpt: "Proč začít s MVP, jak definovat rozsah a jak rychle otestovat produkt na trhu.",
    date: "2025-01-20",
    readTime: "6 min",
    category: "Vývoj",
    body: "MVP (Minimum Viable Product) je nejmenší verze produktu, která ještě přináší hodnotu uživatelům a umožňuje ověřit hypotézy. Místo měsíců vývoje všech funkcí nejdříve spusťte jádro — jednu hlavní cestu uživatele. Zpětná vazba z reálného provozu pak určí další kroky. Doporučujeme časový rámec 4–12 týdnů a jasné KPI (počet uživatelů, konverze, spokojenost).",
  },
  {
    slug: "integrace-webu-a-crm",
    title: "Integrace webu a CRM: formuláře, leady a automatizace",
    excerpt: "Jak propojit webové formuláře s CRM a e-mailem, aby žádný lead nezůstal bez odpovědi.",
    date: "2025-01-12",
    readTime: "4 min",
    category: "Integrace",
    body: "Kontaktní a poptávkové formuláře na webu by měly zapisovat data přímo do CRM a ideálně spustit automatické potvrzení e-mailem a notifikaci obchodníkovi. Realizuje se to přes API nebo webhooky — podle zvoleného CRM (Pipedrive, HubSpot, vlastní). Doplňkově lze napojit newsletter a e-mailové kampaně. Cíl: žádný lead nesmí zůstat bez odpovědi déle než pár hodin.",
  },
  {
    slug: "responzivni-web-pro-firmy",
    title: "Proč má mít firemní web responzivní design",
    excerpt: "Většina návštěvníků přijde z mobilu. Jak na rychlý a přehledný web na všech zařízeních.",
    date: "2025-01-05",
    readTime: "3 min",
    category: "Tvorba webu",
    body: "Většina vyhledávání a návštěv webů dnes probíhá na mobilu. Responzivní web se přizpůsobí šířce obrazovky — jeden zdroj obsahu, různé rozložení. Google upřednostňuje mobilně přívětivé stránky. Důležité je také rychlé načítání (optimalizace obrázků, kódu) a čitelnost bez nutnosti přibližování. Při tvorbě nového webu responzivitu vždy požadujte.",
  },
  {
    slug: "bezpecnost-webovych-aplikaci",
    title: "Základy bezpečnosti webových aplikací pro firmy",
    excerpt: "HTTPS, ochrana dat, hesla a co požadovat od dodavatele při vývoji aplikace.",
    date: "2024-12-20",
    readTime: "5 min",
    category: "Bezpečnost",
    body: "Základ je HTTPS a aktuální certifikát. Hesla musí být ukládána pouze v hashované podobě (např. bcrypt), citlivá data šifrována. Ochrana proti XSS a CSRF patří do standardu. Při výběru dodavatele se ptejte na zpracování osobních údajů (GDPR), zálohy a zotavení po havárii. Dokumentace bezpečnostních opatření by měla být součástí předání projektu.",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
