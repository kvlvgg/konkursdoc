<template>
    <div>
        <v-select
            v-model="select"
            :options="options"
            :reduce="item => item.value"
            :clearable="clearable"
            :searchable="searchable"
            :placeholder="placeholder"
            :class="{ 'is-invalid': state === false }"
            :state="state"
            :map-keydown="mapKeydown"
            :autoscroll="autoscroll"
            :appendToBody="appendToBody"
            :calculatePosition="calculatePosition"
            @input="onInput"
            @search="$emit('search', $event)"
        >
            <template #open-indicator="{ attributes }">
                <span v-bind="attributes">
                    <svg width="12" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.984.984h10.032L6 6 .984.984z" fill="#4B4862" />
                    </svg>
                </span>
            </template>
            <template slot="no-options">Ничего не найдено</template>
        </v-select>

        <b-form-invalid-feedback>{{ error }}</b-form-invalid-feedback>
    </div>
</template>

<script>
export default {
    name: 'v-select-input',

    props: {
        value: {
            type: [Number, String],
            default: 0,
        },

        options: {
            type: Array,
            default: () => [],
        },

        searchable: {
            type: Boolean,
            default: false,
        },

        placeholder: {
            type: String,
            default: '',
        },

        state: {
            type: Boolean,
            default: null,
        },

        error: {
            type: String,
            default: '',
        },

        autoscroll: {
            type: Boolean,
            default: true,
        },

        appendToBody: {
            type: Boolean,
            default: false,
        },

        clearable: {
            type: Boolean,
            default: false,
        },

        calculatePosition: {
            type: Function,
            /**
             * @param dropdownList {HTMLUListElement}
             * @param component {Vue} current instance of vue select
             * @param width {string} calculated width in pixels of the dropdown menu
             * @param top {string} absolute position top value in pixels relative to the document
             * @param left {string} absolute position left value in pixels relative to the document
             * @return {function|void}
             */
            default(dropdownList, component, { width, top, left }) {
                dropdownList.style.top = top;
                dropdownList.style.left = left;
                dropdownList.style.width = width;
            },
        },

        mapKeydown: {
            type: Function,
            default: () => ({}),
        },
    },

    data() {
        return {
            select: '', // model
        };
    },

    watch: {
        value() {
            this.select = this.value;
        },
    },

    created() {
        if (this.value) this.select = this.value;
    },

    methods: {
        /**
         * Ввод данных
         * @return  void
         */
        onInput() {
            this.$emit('input', this.select);
        },
    },
};
</script>

<style lang="scss"></style>
