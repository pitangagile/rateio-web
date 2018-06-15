export function addClass(el, name) {
  if (!el || !name) return;
  el.className += ` ${name}`; // eslint-disable-line no-param-reassign
}

export function removeClass(el, name) {
  if (!el || !name) return;
  let elClass = ` ${el.className} `;
  while (elClass.indexOf(` ${name} `) !== -1) {
    elClass = elClass.replace(` ${name} `, '');
  }
  el.className = elClass; // eslint-disable-line no-param-reassign
}
