<template>
    <div :class="$style.wrapper">
        <div :class="$style.img">
            <img src="~/assets/svg/profile/check-mark.svg" alt="" />
        </div>
        <div :class="$style['feature-name']">{{ feature }}</div>
    </div>
</template>

<script>
export default {
    props: {
        feature: {
            type: String,
            default: '',
        },
    },
};
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    justify-content: space-between;
}

.img,
.feature-name {
    height: rem(31);
    background: #f7f7f7;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.img {
    width: 24%;
}

.feature-name {
    width: 72%;
    @include fontTTNormsRegular();
    justify-content: flex-start;
    padding-left: rem(5);
    font-size: 12px;
}
</style>
