<template functional>
    <ul :class="$style.list">
        <li :class="$style.item">
            <a href="tel:+79653438937" :class="$style.link">+7 (965) 343-89-37</a>
        </li>

        <li :class="$style.item">
            <a href="mailto:support@konkursdoc.com" :class="$style.link">support@konkursdoc.com</a>
        </li>
    </ul>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.list {
    display: flex;
    flex-direction: column;
}

.item {
    margin: 0 0 rem(16) 0;

    &:last-child {
        margin-bottom: 0;
    }
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
