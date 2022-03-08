<template functional>
    <div :class="$style.unit">
        <img :class="$style.icon" src="~assets/svg/logo-row-white.svg" alt="logo" />
    </div>
</template>

<script>
export default {};
</script>

<style module lang="scss">
.unit {
    margin: 0 0 rem(16) 0;
}

.icon {
    max-width: 100%;
}
</style>
