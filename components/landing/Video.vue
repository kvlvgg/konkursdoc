<template>
    <section id="video-block" v-lazy:background-image="'/images/landing/video/bg-video.jpg'" :class="$style.video">
        <div class="container">
            <Title
                title="Видео"
                subtitle="Посмотри как просто найти лучшие цены на IT оборудование и комплектующие"
                is-white
            />

            <div :class="$style.video_wrap">
                <div :class="$style.video_content">
                    <b-embed
                        type="iframe"
                        aspect="16by9"
                        src="https://www.youtube.com/embed/5qap5aO4i9A"
                        allowfullscreen
                    ></b-embed>
                </div>
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
.video {
    padding: rem(70) 0 rem(56);
    color: $white;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: cover;
}

.video_wrap {
    display: flex;
    justify-content: center;
    padding: rem(16) 0 0;
}

.video_content {
    flex: 1 0 80%;
    max-width: 80%;
}
</style>
