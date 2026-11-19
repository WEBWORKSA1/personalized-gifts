// Sends form answers to the site owner's inbox through a form relay.
// The inbox address is never written in a page; it is rebuilt here only at the
// moment a visitor presses send, and not at all once an alias or key is set.
import CONFIG from './config.js';
import { $, $$, copyWithFeedback } from './lib.js';

const K = [57, 59, 222, 40, 200, 36, 116];
const D = [73, 167, 75, 240, 87, 80, 21, 73, 175, 104, 239, 90, 74, 31, 86, 167, 95, 188, 94, 78];
const inbox = () => String.fromCharCode(...D.slice().reverse().map((c, i) => c ^ K[i % K.length]));

/** Post one message. Resolves true when the relay accepted it. */
export async function relay(formName, fields, { subject = '', replyTo = '' } = {}) {
  const cfg = CONFIG.forms || {};
  const title = subject || `${formName} from ${CONFIG.name}`;
  const common = { headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, method: 'POST' };
  if (cfg.provider === 'web3forms' && cfg.web3formsKey) {
    const res = await fetch('https://api.web3forms.com/submit', {
      ...common,
      body: JSON.stringify({ access_key: cfg.web3formsKey, subject: title, from_name: CONFIG.name, ...(replyTo ? { replyto: replyTo } : {}), ...fields }),
    });
    const json = await res.json().catch(() => ({}));
    return res.ok && json.success === true;
  }
  const target = cfg.alias || inbox();
  const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
    ...common,
    body: JSON.stringify({
      _subject: title, _template: 'table', _captcha: 'false', ...(replyTo ? { _replyto: replyTo } : {}),
      Form: formName, ...fields, Page: location.href.split('?')[0],
    }),
  });
  const json = await res.json().catch(() => ({}));
  return res.ok && String(json.success) === 'true';
}

/** Read a form into { "Question label": "answer" } in page order. */
export function readForm(form) {
  const out = {};
  const seen = new Set();
  for (const el of form.elements) {
    if (!el.name || el.name === 'website' || el.disabled || seen.has(el.name)) continue;
    if (el.type === 'submit' || el.type === 'button') continue;
    seen.add(el.name);
    const label = el.dataset.label || el.name;
    let value;
    if (el.type === 'checkbox' || el.type === 'radio') {
      const picked = $$(`[name="${CSS.escape(el.name)}"]:checked`, form).map((x) => x.value);
      value = picked.join(', ');
      if (el.type === 'checkbox' && $$(`[name="${CSS.escape(el.name)}"]`, form).length === 1) value = el.checked ? 'Yes' : 'No';
    } else {
      value = String(el.value || '').trim();
    }
    if (value) out[label] = value.slice(0, 4000);
  }
  return out;
}

const asText = (fields) => Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');

function status(form, kind, html) {
  let box = $('.form-status', form);
  if (!box) {
    box = document.createElement('div');
    box.className = 'form-status';
    box.setAttribute('role', 'status');
    form.append(box);
  }
  box.className = `form-status${kind ? ` is-${kind}` : ''}`;
  box.innerHTML = html;
  return box;
}

/**
 * Wire a form. Options: name, subject(fields), success (HTML), before(fields) may
 * add or change answers, after() runs once the message is accepted.
 */
export function wireForm(form, { name, subject, success, before, after } = {}) {
  if (!form || form.dataset.wired) return;
  form.dataset.wired = '1';
  form.setAttribute('novalidate', '');
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status(form, 'error', 'Some answers are missing. The first one is highlighted above.');
      return;
    }
    const button = $('[type=submit]', form);
    const done = success || form.dataset.success || 'Sent. Thank you. Look out for a reply by email.';
    // Bots fill every field, people never see this one.
    if (form.elements.website && form.elements.website.value) { form.innerHTML = `<div class="form-status is-ok" role="status">${done}</div>`; return; }
    let fields = readForm(form);
    if (before) fields = before(fields) || fields;
    const formName = name || form.dataset.relay || 'Message';
    const email = form.elements.email ? String(form.elements.email.value || '').trim() : '';
    button.disabled = true;
    const label = button.textContent;
    button.textContent = 'Sending';
    status(form, '', 'Sending your answers.');
    let ok = false;
    try {
      ok = await relay(formName, fields, { subject: subject ? subject(fields) : '', replyTo: email });
    } catch { ok = false; }
    if (ok) {
      form.innerHTML = `<div class="form-status is-ok" role="status" tabindex="-1">${done}</div>`;
      $('.form-status', form).focus();
      if (after) after(fields);
      return;
    }
    button.disabled = false;
    button.textContent = label;
    const box = status(form, 'error',
      'That did not send, and nothing was lost. Try again in a minute. If it keeps failing, copy your answers and use the contact link at the top of this page. ' +
      '<button type="button" class="link" data-copy-answers>Copy my answers</button>');
    $('[data-copy-answers]', box).addEventListener('click', (e) => copyWithFeedback(e.currentTarget, asText(fields)));
  });
}

/** Any form marked data-relay="Name" is wired automatically. */
export function wireAll(scope = document) {
  for (const form of $$('form[data-relay]', scope)) wireForm(form);
}
