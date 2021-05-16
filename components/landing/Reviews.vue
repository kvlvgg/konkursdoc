<template>
  <section id="reviews-block" :class="$style['reviews']">
    <div class="container">
      <div :class="[$style['section-title-content'], $style['_white']]">
        <h2 :class="$style['section-title']">Отзывы Наших клиентов</h2>
      </div>

      <div :class="$style['reviews-list-wrap']">
        <div :class="$style['reviews-list']">
          <div :class="$style['reviews-item']">
            <div :class="$style['reviews-item-icon-wrap']">
              <svg
                width="62"
                height="52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M59.433 2.562C57.933.95 55.76.092 52.975.01c-7.86-.253-13.418 3.912-16.52 12.376-.163.444-.064.937.259 1.286.32.347.803.485 1.258.36a9.977 9.977 0 012.63-.367c1.146 0 2.67.21 3.43 1.208.582.767.66 1.917.235 3.418-.36 1.266-2.211 4.655-4.502 8.242-2.791 4.37-4.333 6.328-4.778 6.328-1.473 0-6.795-23.503-6.94-24.018-1.527-5.387-2.294-8.09-7.258-8.09-3.783 0-12.22 6.88-19.149 12.875-.426.368-.785.679-1.063.915-.67.57-.77 1.561-.23 2.255l1.292 1.657a1.65 1.65 0 002.259.332l.07-.05c2.242-1.59 4.36-3.09 5.958-3.171 1.737-.085 3.244 2.618 5.041 9.05C18.39 37.108 23.59 52 28.925 52c5.577 0 12.229-4.708 20.828-15.854 7.783-10.088 11.95-18.088 12.218-23.91.201-4.396-.653-7.65-2.538-9.674z"
                  fill="#69B4E5"
                />
              </svg>
            </div>
            <div class="font-weight-bold" :class="$style['reviews-item-title']">
              Vimeo
            </div>
            <div class="font-weight-light" :class="$style['reviews-item-text']">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              fermentum feugiat scelerisque ac faucibus donec nam. Nulla metus,
              platea curabitur molestie adipiscing nec, elementum.
            </div>
          </div>

          <div :class="$style['reviews-item']">
            <div :class="$style['reviews-item-icon-wrap']">
              <svg
                width="52"
                height="52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.007 23.439a8.7 8.7 0 001.384-4.864c-.08-4.795-4.07-8.606-8.866-8.606H1.135C.509 9.969 0 10.477 0 11.105V40.55c0 .627.508 1.136 1.136 1.136h14.956c5.552 0 10.15-4.45 10.173-10.001a10.037 10.037 0 00-4.258-8.246zM5.874 15.843h8.765a2.882 2.882 0 012.88 2.88 2.882 2.882 0 01-2.88 2.878H5.874v-5.758zm10.349 19.968H5.874v-8.336h10.349a4.173 4.173 0 014.168 4.168 4.173 4.173 0 01-4.168 4.168zm35.776-6.214c0-6.857-5.404-12.434-12.046-12.434-6.643 0-12.047 5.578-12.047 12.434 0 6.856 5.404 12.434 12.047 12.434 4.03 0 7.775-2.066 10.018-5.527.28-.432.534-.882.759-1.347a.51.51 0 00-.46-.731l-5.921-.015a.5.5 0 00-.35.145c-1.118 1.087-2.489 1.6-4.046 1.6-2.943 0-5.41-2.2-6.024-5.134H50.82a1.18 1.18 0 001.179-1.18v-.245zm-12.046-6.56c2.155 0 4.055 1.18 5.159 2.965H34.793c1.105-1.784 3.004-2.965 5.16-2.965zm5.005-7.334H34.274a.903.903 0 01-.903-.903v-2.68c0-.499.404-.903.903-.903h10.684c.499 0 .903.404.903.903v2.68a.903.903 0 01-.903.903z"
                  fill="#0067FF"
                />
              </svg>
            </div>
            <div class="font-weight-bold" :class="$style['reviews-item-title']">
              Behance
            </div>
            <div class="font-weight-light" :class="$style['reviews-item-text']">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              fermentum feugiat scelerisque ac faucibus donec nam. Nulla metus,
              platea curabitur molestie adipiscing nec, elementum.
            </div>
          </div>

          <div :class="$style['reviews-item']">
            <div :class="$style['reviews-item-icon-wrap']">
              <svg
                width="58"
                height="40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.1.002S14.416-.25 7.208 4.997C7.209 4.997 0 17.36 0 32.605c0 0 3.996 6.843 14.952 7.102 0 0 1.6-2.096 3.217-3.94-6.155-1.841-8.55-5.522-8.55-5.522s.535.26 1.338.786h.236c.114 0 .17.053.229.108l.01.01v.024c.063.063.118.118.24.118 13.085 5.31 24.021 6.536 36.5-1.322 0 0-2.399 3.682-8.81 5.522 1.322 1.833 3.178 3.933 3.178 3.933 8.981-.194 13.463-4.822 14.92-6.328.322-.332.497-.513.54-.46 0-15.22-7.252-27.608-7.252-27.608C44.267.289 38.211.077 37.066.073l-.731.72c8.278 2.36 12.285 6.044 12.285 6.044-20.109-9.897-36.944-1.652-39.48-.41a3.46 3.46 0 01-.323.15s4-3.94 12.82-6.044L21.1.002zm15.99.051l.13-.047h-.083l-.047.047zm.892 26.874c2.796 0 5.074-2.36 5.074-5.27 0-2.89-2.266-5.25-5.074-5.25v.012c-2.784 0-5.065 2.351-5.073 5.262 0 2.886 2.277 5.246 5.073 5.246zm-13.088-5.27c0 2.91-2.277 5.27-5.073 5.27-2.796 0-5.073-2.36-5.073-5.246 0-2.91 2.277-5.262 5.073-5.262l.016-.012c2.796 0 5.057 2.36 5.057 5.25z"
                  fill="#5C6BC0"
                />
              </svg>
            </div>
            <div class="font-weight-bold" :class="$style['reviews-item-title']">
              Discord
            </div>
            <div class="font-weight-light" :class="$style['reviews-item-text']">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci
              fermentum feugiat scelerisque ac faucibus donec nam. Nulla metus,
              platea curabitur molestie adipiscing nec, elementum.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/module/lendingSection.scss';

.reviews {
  padding: 70px 0 80px;
  color: $white;
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  background-image: url(~assets/image/landing/bg-reviews.jpg);
  background-attachment: fixed;
}

.reviews-list-wrap {
  margin: 7rem 8.333333% 0;
}

.reviews-list {
  display: flex;
  margin: 0 -1rem;
  padding: 1rem 0 0 0;
}

.reviews-item {
  flex: 1 1 33.33%;
  width: 33.33%;
  padding: 0 1rem 1rem;
  margin: 0 1rem 1rem;
  background-color: $white;
  color: $body-color;
  border-radius: 4px;
}

.reviews-item-icon-wrap {
  height: 108px;
  width: 108px;
  margin: -54px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $white;
  border: 6px solid #493d7b;
  border-radius: 50%;
}

.reviews-item-title {
  font-size: 24px;
  line-height: 38px;
  color: $white;
  margin: 1rem 0 0;
  background-color: #221541;
  box-shadow: $box-shadow;
  border-radius: 3rem;
  text-align: center;
}

.reviews-item-text {
  font-size: 14px;
  line-height: 1.2em;
  margin: 1.5rem 0 0 0;
}
</style>
