import './style.scss'

// Drop and hide inner conntent
const initFiltersBadgesToggle = () => {
    const toggle = document.querySelector('.filters__tollge-selects')
    toggle.addEventListener('click', function() {
        this
            .closest('.filters__selected')
            .classList
            .toggle('show')
    })
}

const handleFiltersItemToggleClick = (toggle) => {
    const isShow = toggle.classList.contains('show')
    var collapse = toggle.nextElementSibling

    if (isShow) {
        toggle.classList.remove('show')
        collapse.classList.remove('show')
        return
    }

    toggle.classList.add('show')
    collapse.classList.add('show')
}

const initFiltersItemToggles = () => {
    const togglers = Array.from(document
        .querySelectorAll('.filters__toggle:not(:has(.filters__radio))'))

    togglers.forEach(toggle => toggle
        .addEventListener('click', function(e) {
            e.preventDefault()
            e.stopPropagation()
            handleFiltersItemToggleClick(this)
        }))
}

// Tooltips
const initFiltersTooltips = () => {
    const tooltips = Array.from(document.querySelectorAll('.filters__tooltip'))

    tooltips.forEach(tooltip => tooltip.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
    }))
}

const hideAllFilterTooltips = () => {
    const tooltips = Array.from(document
        .querySelectorAll('.filters__tooltip'))

    tooltips.forEach(tooltip => tooltip.classList.remove('show', 'visible'))
}

const getPositionFiltersTooltipsActions = (node) => {
    var rect = node.getBoundingClientRect()
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop
    var left = rect.left + scrollLeft
    var top = rect.top + scrollTop
    return { left: left, top: top }
}

const setFiltersTooltipPosition = (button, tooltip) => {
    const {left, top} = getPositionFiltersTooltipsActions(button)
    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
}

const showSingleFiltersTooltip = (tooltip) => {
    tooltip.classList.add('show')

    setTimeout(
        () => tooltip.classList.add('visible'),
        100
    )
}

const handlerFiltersTooltipsActionsClick = (button) => {
    const tooltip = button
        .closest('.filters__toggle')
        .querySelector('.filters__tooltip')

    if (tooltip.classList.contains('show')) {
        hideAllFilterTooltips()
        return
    }

    window.innerWidth > 1200
        ? setFiltersTooltipPosition(button, tooltip)
        : tooltip.removeAttribute('style')

    hideAllFilterTooltips()
    showSingleFiltersTooltip(tooltip)
}

const initFiltersTooltipsActions = () => {
    const btns = Array.from(document.querySelectorAll('.filters__toggle strong'))

    btns.forEach(btn => btn.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        handlerFiltersTooltipsActionsClick(this)
    }))
}

const initHideAllFilterTooltipsOnWindow = () => {
    const filterScrollBody = document.querySelector('.filters__scrollable')
    filterScrollBody.addEventListener('scroll', hideAllFilterTooltips)

    const filtersToggles = Array.from(document.querySelectorAll('.filters__toggle'))
    filtersToggles.forEach(toggle => toggle.addEventListener('click', hideAllFilterTooltips))

    window.addEventListener('resize', hideAllFilterTooltips)
    document.addEventListener('click', hideAllFilterTooltips)
}

const initHandlerFilterTooltipsClose = () => {
    const buttons = Array.from(document
        .querySelectorAll('.filters__tooltip-close'))

    buttons.forEach(btn => btn.addEventListener(
        'click',
        hideAllFilterTooltips
    ))
}

// Lists
const handlerFitlerDropTogglerClick = (toggle) => {
    const list = toggle.parentNode
        .querySelector('.filters__controller-list')

    const isCompressed = !list.classList.contains('uncompressed')

    if (isCompressed) {
        list.classList.add('uncompressed')
        toggle.innerText = 'Свернуть'
        return
    }

    list.classList.remove('uncompressed')
    toggle.innerText = 'Смотреть все'
}

const initFiltersDropTogglers = () => {
    const togglers = Array.from(document
        .querySelectorAll('.filters__drop-toggler'))

    togglers.forEach(toggle => toggle.addEventListener('click', function() {
        handlerFitlerDropTogglerClick(this)
    }))
}

window.addEventListener('load', () => {
    const isFilters = document.querySelector('.filters')
    if (!isFilters) return

    initFiltersItemToggles()
    initFiltersBadgesToggle()
    initFiltersTooltips()
    initFiltersTooltipsActions()
    initHideAllFilterTooltipsOnWindow()
    initHandlerFilterTooltipsClose()
    initFiltersDropTogglers()
})