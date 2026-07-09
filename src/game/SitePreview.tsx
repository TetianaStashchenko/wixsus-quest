import type { DesignTokens, SitePart } from './design';
import { galleryTiles, NEUTRAL, siteVars } from './design';
import type { Lang } from './i18n';
import { UI } from './i18n';
import { WIX_APPS } from './quest';

interface Props {
  tokens: DesignTokens;
  parts: SitePart[];
  chrome?: boolean;
  lang?: Lang;
}

const has = (parts: SitePart[], p: SitePart) => parts.includes(p);

export default function SitePreview({ tokens, parts, chrome = true, lang = 'uk' }: Props) {
  const pal = tokens.palette ?? NEUTRAL;
  const biz = tokens.business;
  const siteName = biz?.siteName ?? 'Мій сайт';
  const tagline = biz?.tagline ?? 'Тут зʼявиться твій світ';
  const ctaLabel = tokens.cta?.label ?? 'Дізнатись більше';
  const tone = tokens.tone;
  const count = tokens.servicesCount?.count ?? 3;
  const services = (biz?.services ?? []).slice(0, count);
  const tiles = galleryTiles(tokens);
  const empty = parts.length === 0;

  return (
    <div className="wq-site" style={siteVars(tokens)}>
      {chrome && (
        <div className="wq-browser-bar">
          <span className="wq-dot" style={{ background: '#FF5F57' }} />
          <span className="wq-dot" style={{ background: '#FEBC2E' }} />
          <span className="wq-dot" style={{ background: '#28C840' }} />
          <span className="wq-url">{biz ? slug(siteName) : 'twij-sajt'}.wix.site</span>
        </div>
      )}

      <div className="wq-canvas">
        {empty && (
          <div className="wq-blank">
            <div className="wq-blank-bar" />
            <div className="wq-blank-block" />
            <div className="wq-blank-row">
              <span /><span /><span />
            </div>
            <p>Порожньо і сіро... поки що.<br />Пройди рівень — і тут почне зʼявлятися твій сайт.</p>
          </div>
        )}

        {has(parts, 'hero') && (
          <header className="wq-hero wq-pop" style={{ background: pal.bg }}>
            <div className="wq-nav">
              <strong className="wq-logo">{siteName}</strong>
              <nav>
                <span>Головна</span>
                <span>Про нас</span>
                <span>Роботи</span>
                <span>Контакти</span>
              </nav>
            </div>
            <div className="wq-hero-body">
              <div className="wq-hero-copy">
                <span className="wq-eyebrow">{biz?.name}</span>
                <h1>{tagline}</h1>
                <p>Ласкаво просимо до «{siteName}» — місця, зробленого з любовʼю до справи.</p>
                <button className="wq-cta">{ctaLabel}</button>
              </div>
              <div className="wq-hero-art" aria-hidden>
                <div className="wq-blob" />
                <span className="wq-hero-emoji">{biz?.services?.[0]?.icon ?? '✨'}</span>
              </div>
            </div>
          </header>
        )}

        {has(parts, 'about') && (
          <section className="wq-about wq-pop">
            <h2>{tone?.greeting ?? 'Про нас'}</h2>
            <p>{tone?.about}</p>
            <div className="wq-about-stats">
              <div><strong>5+</strong><span>років досвіду</span></div>
              <div><strong>1200</strong><span>щасливих гостей</span></div>
              <div><strong>100%</strong><span>з душею</span></div>
            </div>
          </section>
        )}

        {has(parts, 'gallery') && (
          <section className="wq-gallery wq-pop">
            <h2>Наші роботи</h2>
            <div className="wq-grid">
              {tiles.map((t, i) => (
                <figure key={i} className="wq-tile" style={t.css}>
                  <span className="wq-tile-emoji">{t.emoji}</span>
                  <figcaption>{t.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {has(parts, 'services') && (
          <>
            <section className="wq-services wq-pop">
              <h2>Що ми пропонуємо</h2>
              <div className="wq-cards">
                {services.map((s, i) => (
                  <article key={i} className="wq-card">
                    <span className="wq-card-icon">{s.icon}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </article>
                ))}
              </div>
            </section>
            <footer className="wq-contact wq-pop">
              <h2>Готові почати?</h2>
              <p>Один клік — і ми на звʼязку.</p>
              <button className="wq-cta wq-cta-lg">{ctaLabel}</button>
              <small>© {siteName}. Зібрано у грі «Wixsus Quest» ⚡</small>
            </footer>
          </>
        )}

        {has(parts, 'features') && tokens.wixApps && tokens.wixApps.length > 0 && (
          <div className="wq-wix-apps wq-pop">
            <p className="wq-wix-apps-title">{UI[lang].wixIntegrations}</p>
            <div className="wq-wix-badges">
              {tokens.wixApps.map((appId) => {
                const app = WIX_APPS.find((a) => a.id === appId);
                const name = UI[lang].wixAppNames[appId] ?? appId;
                return app ? (
                  <span key={appId} className="wq-wix-badge">{app.icon} {name}</span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9а-яіїєґ]+/gi, '-').replace(/(^-|-$)/g, '').slice(0, 20) || 'sajt';
}
