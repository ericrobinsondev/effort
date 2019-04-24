export default ({
  items,
  title,
}, formatter) => {
  const innerContent = items
    .map((i) => {
      const value = parseFloat(i.value, 10)
      return `
        <li>
          <span class="box" style="background-color: ${i.color}"></span>
          ${i.label}
          <b ${value === 0 ? 'class="empty"' : null}>${formatter(value)}</b>
        </li>
      `
    }).join('')

  if (innerContent) {
    return `<span class="title">${title}</span> <ul>${innerContent}</ul>`
  }

  return ''
}
