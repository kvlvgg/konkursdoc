<template functional>
    <div :class="$style.unit">
        <a target="_blank" rel="nofollow noopener" href="/" :class="$style.link">Пользовательское соглашение</a>
        <span>и</span>
        <a
            target="_blank"
            rel="nofollow noopener"
            href="http://s3.konkursdoc.pw/static/frontend/privacy-policy-ooo-itdok.pdf"
            :class="$style.link"
            >политика конфиденциальности 152 ФЗ</a
        >
    </div>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.unit {
    @include font(14, 18);
}

.link {
    color: $white;

    @include hover-focus() {
        color: inherit;
        text-decoration: none;
        text-shadow: 0 0 rem(8) rgba($white, 0.5);
    }
}
</style>
