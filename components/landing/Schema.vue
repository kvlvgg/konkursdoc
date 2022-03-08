<template>
    <section id="schema-block" :class="$style.schema">
        <div class="container">
            <Title title="Обмен коммерческими предложениями" subtitle="Посмотрите как легко обмениваться КП" />

            <div :class="$style.image_wrap">
                <img
                    :class="$style.image"
                    src="~assets/image/landing/item-schema.png"
                    alt="Обмен коммерческими предложениями"
                />
            </div>
        </div>
    </section>
</template>

<script>
import Title from '~/components/landing/local/Title.vue';

export default {
    components: {
        Title,
    },
};
</script>

<style module lang="scss">
.schema {
    padding: rem(70) 0 rem(100);
}

.image_wrap {
    display: flex;
    padding: rem(24) 0 0 0;
}

.image {
    width: 100%;
    pointer-events: none;
    user-select: none;
}
</style>
