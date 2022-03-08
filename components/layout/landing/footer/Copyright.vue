<template>
    <div :class="$style.copyright">&copy; {{ year }} ООО «ИТДОК»</div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear(),
        };
    },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.copyright {
    @include font(14, 14);
    margin: rem(32) 0 0 0;
}
</style>
