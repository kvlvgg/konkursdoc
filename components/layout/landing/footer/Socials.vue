<template functional>
    <ul :class="$style.list">
        <li :class="$style.item">
            <a target="_blank" rel="nofollow noopener" href="#" :class="$style.link">
                <img v-lazy="'/svg/landing/layouts/footer/1.svg'" width="24" height="24" alt="Icon" />
            </a>
        </li>

        <li :class="$style.item">
            <a target="_blank" rel="nofollow noopener" href="#" :class="$style.link">
                <img v-lazy="'/svg/landing/layouts/footer/2.svg'" width="24" height="24" alt="Icon" />
            </a>
        </li>

        <li :class="$style.item">
            <a target="_blank" rel="nofollow noopener" href="#" :class="$style.link">
                <img v-lazy="'/svg/landing/layouts/footer/3.svg'" width="24" height="24" alt="Icon" />
            </a>
        </li>

        <li :class="$style.item">
            <a target="_blank" rel="nofollow noopener" href="#" :class="$style.link">
                <img v-lazy="'/svg/landing/layouts/footer/4.svg'" width="24" height="24" alt="Icon" />
            </a>
        </li>
    </ul>
</template>

<script>
export default {};
</script>

<style module lang="scss">
.list {
    display: flex;
    justify-content: flex-end;
    padding: rem(16) 0 0 0;
    margin: auto 0 0 0;
}

.item {
    margin: 0 0 0 rem(28);

    &:first-child {
        margin-left: 0;
    }
}

.link {
    display: block;
}
</style>
