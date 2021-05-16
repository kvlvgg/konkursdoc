<template>
  <section id="video-block" :class="$style['video']">
    <div class="container">
      <div :class="[$style['section-title-content'], $style['_white']]">
        <h2 :class="$style['section-title']">Видео</h2>
        <h3 :class="$style['section-subtitle']">
          Посмотри как просто сформировать документацию для тендера
        </h3>
      </div>

      <div :class="$style['video-wrap']">
        <div :class="$style['video-current']">
          <b-embed
            type="iframe"
            aspect="16by9"
            :src="blocks[currentID].video"
            allowfullscreen
          ></b-embed>
        </div>

        <div :class="$style['video-list']">
          <div
            v-for="(item, index) in blocks"
            :key="index"
            :class="[$style['video-item'], $style[isCurrentItemClass(item)]]"
          >
            <div
              :class="$style['video-item-wrap']"
              @click="currentID = item.id"
            >
              <div :class="$style['video-item-image-wrap']">
                <img
                  :class="$style['video-item-image']"
                  :src="item.image"
                  :alt="item.text"
                />
              </div>

              <div :class="$style['video-item-content']">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentID: 0,
      blocks: [
        {
          id: 0,
          image: '/images/video/i-1.jpg',
          video: 'https://www.youtube.com/embed/_Yhyp-_hX2s?rel=0',
          text: 'Формирование тендерной документации для организаторов торгов',
        },
        {
          id: 1,
          image: '/images/video/i-1.jpg',
          video: 'https://www.youtube.com/embed/XbGs_qK2PQA?rel=0',
          text: 'Формирование тендерной документации для организаторов торгов',
        },
        {
          id: 2,
          image: '/images/video/i-1.jpg',
          video: 'https://www.youtube.com/embed/r_0JjYUe5jo?rel=0',
          text: 'Формирование тендерной документации для организаторов торгов',
        },
      ],
    };
  },

  methods: {
    /**
     * Класс для выбранного видео
     * @return  String
     */
    isCurrentItemClass(item) {
      return item && item.id === this.currentID ? '_current' : '';
    },
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.video {
  padding: 70px 0 60px;
  color: $white;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-video.jpg);
}

.video-wrap {
  display: flex;
  padding: 1rem 0 2rem;
}

.video-current {
  flex: 1 0 75%;
  max-width: 75%;
}

.video-list {
  flex: 1 0 25%;
  max-width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.video-item {
  width: 100%;
  padding: 0 0 0 1rem;

  &._current {
    .video-item-image-wrap {
      &:after {
        background-image: linear-gradient(
          180deg,
          rgba(255, 106, 22, 0.3) 0%,
          #ffffff 100%
        );
      }
    }

    .video-item-content {
      background-color: #ff7b01;
      color: $white;
    }
  }
}

.video-item-wrap {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}

.video-item-image-wrap {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
      360deg,
      #221541 0%,
      rgba(56, 31, 117, 0.2) 100%
    );
  }
}

.video-item-image {
  width: 100%;
}

.video-item-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 1rem;
  background-color: $white;
  color: #221541;
  border-radius: 4px;
}
</style>
