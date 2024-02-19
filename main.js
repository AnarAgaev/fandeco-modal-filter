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
    var left = rect.left
    var top = rect.top
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

// Drop and hide Lists with controllers
const handlerFitlerDropTogglerClick = (toggle) => {
    const list = toggle.parentNode
        .querySelector('.filters__controller-list')

    const isCompressed = !list.classList.contains('uncompressed')

    if (isCompressed) {
        list.classList.add('uncompressed')
        toggle.innerText = 'Свернуть'
        return
    }

    list.scrollTop = 0
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

// Searchig controllers lists
const checkFiltersDropToggler = (items) => {
    const dropToggler = items[0]
        .closest('.filters__dropdown')
        .querySelector('.filters__drop-toggler')

    const unfilteredVals = Array
        .from(items)
        .filter(item => !item
            .closest('.filters__controller')
            .classList.contains('invisible'))

    unfilteredVals.length <= 10
        ? dropToggler.classList.add('invisible')
        : dropToggler.classList.remove('invisible')
}

const handleSearchInput = (e) => {
    const input = e.target
    const parent = input.closest('.filters__item')
    const items = parent.querySelectorAll('.filters__checkbox .text')

    for (const i of items) {
        const parentNode = i.closest('.filters__controller')
        let value = i.innerText.trim().toLowerCase().replace(/ё/g, 'е')
        let marker = input.value.trim().toLowerCase().replace(/ё/g, 'е')
        const isContains = value.includes(marker)

        parentNode.classList.remove('invisible')
        if (!isContains) parentNode.classList.add('invisible')
    }

    checkFiltersDropToggler(items)
}

const initFiltersFilters = () => {
    const searches = Array.from(document
        .querySelectorAll('.filters__search input'))

    searches.forEach(input => input.addEventListener(
        'input',
        handleSearchInput
    ))
}

// Periods
const setFiltersInputFromRange = (node) => {
    const val = node.value
    const name = node.name
    const type = node.dataset.target
    const target = document.querySelector(`[data-range-name="${name}"][data-range-type="${type}"]`)
    target.value = val
}

const setFiltersRangeView = (node, val) => {
    if (!val) val = node.value

    const type = node.dataset.target
    const bar = node.parentNode.querySelector('.bar')
    const slide = node.parentNode.querySelector('.slide')
    const max = node.max - node.min
    const value = val - node.min
    const percentValue = value / max * 100

    slide.style.left = `${percentValue}%`

    bar.style.width = type === 'min'
        ? `calc(${100 - percentValue}% + 20px)`
        : `calc(${percentValue}% + 20px)`
}

const fixFiltesInputRangeValue = (val) => {
    if (val === '.') val = ''

    if (val === '0') val = ''

    val = val.replace(/[^0-9.]/g, "") // вырезаем все кроме цифр и точки
    val = val.replace(/\.+/g, '.') // вырезаем несколько точек подряд

    if ((val.match(/\./g) || []).length > 1) { // если количество точке (не подряд) блее одной
        val = val.replace(/\.$/, '') // отрезаем точку в конце строки
    }

    return val
}

const handleBlurPeriodInput = (node, e) => {
    const type = node.dataset.rangeType
    const name = node.dataset.rangeName
    const target = document.querySelector(`[name="${name}"][data-target="${type}"]`)
    let val = node.value

    if (val === '') val = type === 'min'
        ? target.min
        : target.max

    if (parseFloat(val) < parseFloat(target.min)) val = target.min
    if (parseFloat(val) > parseFloat(target.max)) val = target.max

    node.value = val
    setFiltersRangeView(target, val)
}


const initFiltersPeriods = () => {
    const ranges = Array.from(document.querySelectorAll('[type="range"]'))
    ranges.forEach(range => range.addEventListener('input', function() {
        setFiltersInputFromRange(this)
        setFiltersRangeView(this)
    }))

    const inputs = Array.from(document.querySelectorAll('.filters__priod-values [type="text"]'))
    inputs.forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = fixFiltesInputRangeValue(this.value)
        })

        input.addEventListener('keypress', function(e) {
            if (e.key === "Enter") this.blur()
        })

        input.addEventListener('blur', function(e) {
            handleBlurPeriodInput(this, e)
        })
    })
}

// Seletcs
const checkFiltersResetBadges = () => {
    const nodes = Array.from(document
        .querySelectorAll('.filters__selected button:not(.filters__reset)'))

    const selected = document.querySelector('.filters__selected')

    if (nodes.length === 0) selected.classList.add('invisible')
}

const initFiltersRemoveSelected = () => {
    const nodes = Array.from(document
        .querySelectorAll('.filters__selected button:not(.filters__reset)'))

    nodes.forEach(node => node.addEventListener('click', function() {
        this.parentNode.remove()
        checkFiltersResetBadges()
    }))
}

// Toggle filter modal
const initFiltersModal = () => {
    const close = document.querySelector('.filters__close')
    const toggler = document.querySelector('.filters-toggler')
    const modal = document.getElementById('filters')

    const toggleFilter = () => {
        if (modal.classList.contains('show')) {
            document.body.classList.remove('filters-opem')
            modal.classList.remove('visible')
            setTimeout(() => modal.classList.remove('show'), 100)
            return
        }

        document.body.classList.add('filters-opem')
        modal.classList.add('show')
        setTimeout(() => modal.classList.add('visible'), 100)
    }

    close.addEventListener('click', toggleFilter)
    toggler.addEventListener('click', toggleFilter)
}

window.addEventListener('load', () => {
    const isFilters = document.querySelector('.filters')
    if (!isFilters) return

    // Dropdowns
    initFiltersItemToggles()
    initFiltersBadgesToggle()

    // Tooltips
    initFiltersTooltips()
    initFiltersTooltipsActions()
    initHideAllFilterTooltipsOnWindow()
    initHandlerFilterTooltipsClose()
    initFiltersDropTogglers()

    // Searchig
    initFiltersFilters()

    // Periods
    initFiltersPeriods()

    // Seletcs
    initFiltersRemoveSelected()

    // Toggle filter modal
    initFiltersModal()
})
