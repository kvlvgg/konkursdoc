import 'jodit/build/jodit.min.css';
import Vue from 'vue';
import JoditEditor from '~/components/editor/JoditEditor.vue';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('JoditEditor', JoditEditor);
}

Vue.use(install);
