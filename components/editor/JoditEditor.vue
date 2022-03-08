<template>
    <textarea></textarea>
</template>

<script>
import KDJoditEditor from './kd-jodit-editor.js';

export default {
    name: 'jodit-editor',

    props: {
        value: { type: String, required: true },
        buttons: { type: Array, default: null },
        extraButtons: { type: Array, default: null },
        config: { type: Object, default: () => ({}) },
    },

    data: () => ({ editor: null }),

    computed: {
        editorConfig() {
            const config = { ...this.config };

            if (this.buttons) {
                config.buttons = this.buttons;
                config.buttonsMD = this.buttons;
                config.buttonsSM = this.buttons;
                config.buttonsXS = this.buttons;
            }

            if (this.extraButtons) config.extraButtons = this.extraButtons;
            return config;
        },
    },

    watch: {
        value(newValue) {
            if (this.editor.value !== newValue) this.editor.value = newValue;
        },
    },

    mounted() {
        this.editor = new KDJoditEditor(this.$el, this.editorConfig);
        this.editor.value = this.value;
        this.editor.events.on('change', newValue => this.$emit('input', newValue));
    },

    beforeDestroy() {
        this.editor.destruct();
    },

    methods: {
        Export2Doc(filename) {
            this.editor.Export2Docx.exec(filename);
        },
        Print() {
            this.editor.Print.exec();
        },
    },
};
</script>
