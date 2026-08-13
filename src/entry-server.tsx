import React from 'react';
import { renderToString } from 'react-dom/server';
// @ts-ignore
import { StaticRouter } from 'react-router';
import { UnheadProvider } from '@unhead/react/client';
import { createHead } from '@unhead/react/server';
import { renderSSRHead } from '@unhead/ssr';
import i18n from './i18n/i18n';
import App from './App';

export async function render(url: string, lang = 'en', translations: any = null) {
  if (translations && lang !== 'en') {
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
  }
  i18n.changeLanguage(lang);

  const head = createHead();
  
  const appHtml = renderToString(
    // @ts-ignore
    <UnheadProvider head={head}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </UnheadProvider>
  );

  const headPayload = await renderSSRHead(head);

  return { appHtml, headPayload };
}
