export async function copyToClipboard(text: string) {
  if (!text) throw new Error('Empty');
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand('copy');
    el.remove();
  }
}


