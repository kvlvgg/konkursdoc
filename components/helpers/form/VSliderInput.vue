<template>
  <div ref="container" :class="containerClass" @click="onBarClick">
    <span class="p-slider-range" :style="rangeStyle"></span>
    <span
      v-if="!range"
      class="p-slider-handle"
      :style="handleStyle"
      tabindex="0"
      role="slider"
      :aria-valuemin="min"
      :aria-valuenow="value"
      :aria-valuemax="max"
      :aria-labelledby="ariaLabelledBy"
      @touchstart="onDragStart($event)"
      @touchmove="onDrag($event)"
      @touchend="onDragEnd($event)"
      @mousedown="onMouseDown($event)"
      @keydown="onKeyDown($event)"
    ></span>
    <span
      v-if="range"
      class="p-slider-handle"
      :style="rangeStartHandleStyle"
      tabindex="0"
      role="slider"
      :aria-valuemin="min"
      :aria-valuenow="value ? value[0] : null"
      :aria-valuemax="max"
      :aria-labelledby="ariaLabelledBy"
      @touchstart="onDragStart($event, 0)"
      @touchmove="onDrag($event)"
      @touchend="onDragEnd($event)"
      @mousedown="onMouseDown($event, 0)"
      @keydown="onKeyDown($event)"
    ></span>
    <span
      v-if="range"
      class="p-slider-handle"
      :style="rangeEndHandleStyle"
      tabindex="0"
      role="slider"
      :aria-valuemin="min"
      :aria-valuenow="value ? value[1] : null"
      :aria-valuemax="max"
      :aria-labelledby="ariaLabelledBy"
      @touchstart="onDragStart($event, 1)"
      @touchmove="onDrag($event)"
      @touchend="onDragEnd($event)"
      @mousedown="onMouseDown($event, 1)"
      @keydown="onKeyDown($event, 1)"
    ></span>
  </div>
</template>

<script>
import DomHandler from './DomHandler';
export default {
  props: {
    value: {
      type: [Number, Array],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    orientation: {
      type: String,
      default: 'horizontal',
    },
    step: {
      type: Number,
      default: null,
    },
    range: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ariaLabelledBy: {
      type: String,
      default: null,
    },
  },
  dragging: false,
  handleIndex: null,
  initX: null,
  initY: null,
  barWidth: null,
  barHeight: null,
  dragListener: null,
  dragEndListener: null,
  computed: {
    containerClass() {
      return [
        'p-slider p-component',
        {
          'p-disabled': this.disabled,
          'p-slider-horizontal': this.orientation === 'horizontal',
          'p-slider-vertical': this.orientation === 'vertical',
        },
      ];
    },
    horizontal() {
      return this.orientation === 'horizontal';
    },
    vertical() {
      return this.orientation === 'vertical';
    },
    rangeStyle() {
      if (this.range) {
        if (this.horizontal)
          return {
            'left': this.rangeStartPosition + '%',
            width: this.rangeEndPosition - this.rangeStartPosition + '%',
          };
        else
          return {
            'bottom': this.rangeStartPosition + '%',
            height: this.rangeEndPosition - this.rangeStartHandlePosition + '%',
          };
      } else {
        // eslint-disable-next-line
        if (this.horizontal) return { 'width': this.handlePosition + '%' };
        else return { 'height': this.handlePosition + '%' };
      }
    },
    handleStyle() {
      if (this.horizontal) return { 'left': this.handlePosition + '%' };
      else return { 'bottom': this.handlePosition + '%' };
    },
    handlePosition() {
      if (this.value < this.min) return 0;
      else if (this.value > this.max) return 100;
      else return ((this.value - this.min) * 100) / (this.max - this.min);
    },
    rangeStartPosition() {
      if (this.value)
        return (
          ((this.value[0] < this.min ? 0 : this.value[0] - this.min) * 100) /
          (this.max - this.min)
        );
      else return 0;
    },
    rangeEndPosition() {
      if (this.value)
        return (
          ((this.value[1] > this.max ? 100 : this.value[1] - this.min) * 100) /
          (this.max - this.min)
        );
      else return 0;
    },
    rangeStartHandleStyle() {
      if (this.horizontal) return { 'left': this.rangeStartPosition + '%' };
      else return { 'bottom': this.rangeStartPosition + '%' };
    },
    rangeEndHandleStyle() {
      if (this.horizontal) return { 'left': this.rangeEndPosition + '%' };
      else return { 'bottom': this.rangeEndPosition + '%' };
    },
  },
  beforeDestroy() {
    this.unbindDragListeners();
  },
  methods: {
    updateDomData() {
      const rect = this.$refs.container.getBoundingClientRect();
      this.initX = rect.left + DomHandler.getWindowScrollLeft();
      this.initY = rect.top + DomHandler.getWindowScrollTop();
      this.barWidth = this.$refs.container.offsetWidth;
      this.barHeight = this.$refs.container.offsetHeight;
    },
    setValue(event) {
      let handleValue;
      const pageX = event.touches ? event.touches[0].pageX : event.pageX;
      const pageY = event.touches ? event.touches[0].pageY : event.pageY;
      if (this.orientation === 'horizontal')
        handleValue = ((pageX - this.initX) * 100) / this.barWidth;
      else
        handleValue =
          ((this.initY + this.barHeight - pageY) * 100) / this.barHeight;
      let newValue = (this.max - this.min) * (handleValue / 100) + this.min;
      if (this.step) {
        const oldValue = this.range ? this.value[this.handleIndex] : this.value;
        const diff = newValue - oldValue;
        if (diff < 0)
          newValue =
            oldValue +
            Math.ceil(newValue / this.step - oldValue / this.step) * this.step;
        else if (diff > 0)
          newValue =
            oldValue +
            Math.floor(newValue / this.step - oldValue / this.step) * this.step;
      }
      this.updateModel(event, newValue);
    },
    updateModel(event, value) {
      let newValue = value;
      let modelValue;
      if (this.range) {
        if (this.handleIndex == 0) {
          if (newValue < this.min) newValue = this.min;
          else if (newValue >= this.value[1]) newValue = this.value[1];
        } else {
          // eslint-disable-next-line
          if (newValue > this.max) newValue = this.max;
          else if (newValue <= this.value[0]) newValue = this.value[0];
        }
        modelValue = [...this.value];
        modelValue[this.handleIndex] = Math.floor(newValue);
      } else {
        if (newValue < this.min) newValue = this.min;
        else if (newValue > this.max) newValue = this.max;
        modelValue = Math.floor(newValue);
      }
      this.$emit('input', modelValue);
      this.$emit('change', modelValue);
    },
    onDragStart(event, index) {
      if (this.disabled) {
        return;
      }
      DomHandler.addClass(this.$el, 'p-slider-sliding');
      this.dragging = true;
      this.updateDomData();
      this.handleIndex = index;
      event.preventDefault();
    },
    onDrag(event) {
      if (this.dragging) {
        this.setValue(event);
        event.preventDefault();
      }
    },
    onDragEnd(event) {
      if (this.dragging) {
        this.dragging = false;
        DomHandler.removeClass(this.$el, 'p-slider-sliding');
        this.$emit('slideend', { originalEvent: event, value: this.value });
      }
    },
    onBarClick(event) {
      if (this.disabled) {
        return;
      }
      if (!DomHandler.hasClass(event.target, 'p-slider-handle')) {
        this.updateDomData();
        this.setValue(event);
      }
    },
    onMouseDown(event, index) {
      this.bindDragListeners();
      this.onDragStart(event, index);
    },
    onKeyDown(event, index) {
      this.handleIndex = index;
      switch (event.which) {
        // down
        case 40:
          if (this.vertical) {
            this.decrementValue(event, index);
            event.preventDefault();
          }
          break;
        // up
        case 38:
          if (this.vertical) {
            this.incrementValue(event, index);
            event.preventDefault();
          }
          break;
        // left
        case 37:
          if (this.horizontal) {
            this.decrementValue(event, index);
            event.preventDefault();
          }
          break;
        // right
        case 39:
          if (this.horizontal) {
            this.incrementValue(event, index);
            event.preventDefault();
          }
          break;
        default:
          break;
      }
    },
    decrementValue(event, index) {
      let newValue;
      if (this.range) {
        if (this.step) newValue = this.value[index] - this.step;
        else newValue = this.value[index] - 1;
      } else {
        // eslint-disable-next-line
        if (this.step) newValue = this.value - this.step;
        else newValue = this.value - 1;
      }
      this.updateModel(event, newValue);
      event.preventDefault();
    },
    incrementValue(event, index) {
      let newValue;
      if (this.range) {
        if (this.step) newValue = this.value[index] + this.step;
        else newValue = this.value[index] + 1;
      } else {
        // eslint-disable-next-line
        if (this.step) newValue = this.value + this.step;
        else newValue = this.value + 1;
      }
      this.updateModel(event, newValue);
      event.preventDefault();
    },
    bindDragListeners() {
      if (!this.dragListener) {
        this.dragListener = this.onDrag.bind(this);
        document.addEventListener('mousemove', this.dragListener);
      }
      if (!this.dragEndListener) {
        this.dragEndListener = this.onDragEnd.bind(this);
        document.addEventListener('mouseup', this.dragEndListener);
      }
    },
    unbindDragListeners() {
      if (this.dragListener) {
        document.removeEventListener('mousemove', this.dragListener);
        this.dragListener = null;
      }
      if (this.dragEndListener) {
        document.removeEventListener('mouseup', this.dragEndListener);
        this.dragEndListener = null;
      }
    },
  },
};
</script>

<style>
.p-slider {
  position: relative;
}
.p-slider .p-slider-handle {
  position: absolute;
  cursor: grab;
  touch-action: none;
  display: block;
}
.p-slider-range {
  position: absolute;
  display: block;
}
.p-slider-horizontal .p-slider-range {
  top: 0;
  left: 0;
  height: 100%;
}
.p-slider-horizontal .p-slider-handle {
  top: 50%;
}
.p-slider-vertical {
  height: 100px;
}
.p-slider-vertical .p-slider-handle {
  left: 50%;
}
.p-slider-vertical .p-slider-range {
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>

<style lang="scss">
@import '~/assets/scss/var.scss';

.p-slider {
  background: #e9ecef;
  border: 0 none;
  border-radius: 4px;
}
.p-slider.p-slider-horizontal {
  height: 0.286rem;
}
.p-slider.p-slider-horizontal .p-slider-handle {
  margin-top: -0.5rem;
  margin-left: -0.5rem;
}
.p-slider.p-slider-vertical {
  width: 0.286rem;
}
.p-slider.p-slider-vertical .p-slider-handle {
  margin-left: -0.5rem;
  margin-bottom: -0.5rem;
}
.p-slider .p-slider-handle {
  height: 1rem;
  width: 1rem;
  background: $primary;
  border: 2px solid $primary;
  border-radius: 6px;
  transition: background-color 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.p-slider .p-slider-handle:focus {
  outline: 0 none;
  outline-offset: 0;
  // box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}
.p-slider .p-slider-range {
  background: $primary;
}
.p-slider:not(.p-disabled) .p-slider-handle:hover {
  background: $primary;
  border-color: $primary;
}

.p-slider.p-disabled .p-slider-handle {
  display: none;
}
</style>
