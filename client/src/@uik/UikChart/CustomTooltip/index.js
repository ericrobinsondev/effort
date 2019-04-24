import defaultRenderer from './renderers/default'

/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

export default function createCustomTooltip(tooltipEl, tooltip, formatter, renderer = defaultRenderer) {
  if (!tooltipEl) {
    return
  }
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0 // eslint-disable-line
    return
  }
  const contentRoot = tooltipEl.querySelector('.tooltip__content')
  contentRoot.className = `tooltip__content ${tooltip.yAlign} ${tooltip.xAlign}`

  // Set Text
  if (tooltip.body) {
    const items = tooltip.body
      .map(i => i.lines[0].split(':').map(text => text.trim()))
      .map((i, index) => ({
        color: tooltip.labelColors[index].backgroundColor,
        label: i[0],
        value: i[1],
      }))

    contentRoot.innerHTML = renderer({
      items,
      title: tooltip.title[0],
    }, formatter)
  }

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = `${tooltip.caretX}px`
  tooltipEl.style.top = `${tooltip.caretY}px`
  tooltipEl.style.fontSize = tooltip.fontSize
  tooltipEl.style.fontStyle = tooltip._fontStyle
}
