import Vue from 'vue';

Vue.directive('virtual-scroll', {
    bind(el, binding, vnode) {
        const callback = binding.value;
        if (!callback) return;

        const tableWrapper = el;
        const table = tableWrapper.querySelector('table');

        tableWrapper.addEventListener('scroll', function () {
            const tableWrapperBottom = tableWrapper.getBoundingClientRect().bottom;
            const tableBottom = table.getBoundingClientRect().bottom;
            const isEndOfItemsIsClose = tableBottom - 200 < tableWrapperBottom;

            if (isEndOfItemsIsClose) callback();
        });
    },
});
