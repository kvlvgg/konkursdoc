export default {
  methods: {
    // позиция скрола окна
    currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (window.pageYOffset) {
        return window.pageYOffset;
      }

      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
      }

      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) {
        return document.body.scrollTop;
      }

      return 0;
    },

    // позиция скрола по вертикали элемента
    elmYPosition(eID) {
      const elm = document.getElementById(eID);
      if (!elm) return 0;

      let y = elm.offsetTop;
      let node = elm;

      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      }

      return y;
    },

    /**
     * скролим до нужного элемента
     * @click="smoothScroll('about')
     * @param  String  eID  ID элемента до которого скролим
     */
    smoothScroll(eID) {
      function scrollStep(leap) {
        window.scrollTo(0, leap);
      }

      const startY = this.currentYPosition();
      const stopY = this.elmYPosition(eID);
      const distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
        scrollStep(stopY);
        return;
      }

      let speed = Math.round(distance / 100);
      if (speed >= 20) {
        speed = 20;
      }

      const step = Math.round(distance / 25);
      let leapY = stopY > startY ? startY + step : startY - step;
      if (stopY > startY) {
        for (let i = startY, timer = 0; i < stopY; i += step, timer++) {
          setTimeout(scrollStep, timer * speed, leapY);
          leapY += step;
          if (leapY > stopY) leapY = stopY;
        }
        return;
      }

      for (let i = startY, timer = 0; i > stopY; i -= step, timer++) {
        setTimeout(scrollStep, timer * speed, leapY);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
      }
    },
  },
};
