import './style.scss'

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

window.addEventListener('load', () => {
    const isFilters = document.querySelector('.filters')
    if (!isFilters) return

    initFiltersItemToggles()
    initFiltersBadgesToggle()
})