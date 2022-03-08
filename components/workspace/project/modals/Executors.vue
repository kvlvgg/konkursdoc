<template>
    <div class="executorModal">
        <div class="font-weight-bold custom-modal-title">Исполнители</div>
        <div class="font-weight-normal custom-form-subtitle">Список активных исполнителей</div>

        <div :class="$style.executors">
            <div :class="$style.executor">
                <div :class="$style.wrapper">
                    <img :class="$style.img" src="~assets/svg/dashboard/person.svg" alt="konkursdok icon user" />
                    <span :class="$style.name">
                        {{ $user.firstname }}
                    </span>
                </div>

                <div :class="$style.wrapper">
                    <v-select-input
                        v-model="select"
                        :placeholder="placeholder"
                        :options="options"
                        :class="[$style.select, 'selectWrapper']"
                        :clearable="false"
                    />

                    <b-button :class="$style['button-delete']" size="sm" block variant="outline-primary">
                        <IconDelete />
                    </b-button>
                </div>
            </div>
        </div>

        <hr :class="$style.line" />

        <div :class="['font-weight-normal', 'custom-form-message', $style.mt40]">Добавить пользователя</div>

        <v-select-input placeholder="Пользователи" />

        <b-button type="submit" variant="gr-primary" :class="['btn-rounded', $style.button]"> Сохранить </b-button>
    </div>
</template>

<script>
import VSelectInput from '~/components/helpers/form/VSelectInput.vue';
import IconDelete from '~/components/icons/dashboard/IconDelete.vue';
export default {
    components: {
        VSelectInput,
        IconDelete,
    },
    data() {
        return {
            executors: [{ name: this.$user }],
            options: [
                { value: 'reading', label: 'Чтение' },
                { value: 'edit', label: 'Редактирование' },
            ],
            select: 'Чтение',
        };
    },
};
</script>

<style module lang="scss">
.mt40 {
    margin-top: 40px;
}

.img {
    width: 16px;
}

.wrapper {
    display: flex;
}

.name {
    margin-bottom: 0;
    margin-left: rem(16);
}

.executor {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dfd9ee;
    box-shadow: $box-shadow-xs;
    border-radius: rem(4);
    padding: rem(3) rem(10) rem(3) rem(13);
    height: rem(30);
    box-sizing: border-box;
}

.select {
    width: 151px;
    height: 24px;
    border-radius: 4px;
    font-family: $font-family-regular;
    color: $purple;
    margin-right: 10px;
    :global(.vs__dropdown-toggle) {
        height: 24px;
        padding: 0 rem(3) 0 rem(5);
        border-color: #dfd9ee;
    }
    :global(.vs__selected) {
        color: $purple;
    }
}

.executors {
    display: block;
}

.button-delete {
    font-size: 120%;
    padding: 0;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        fill: $primary;
        width: 14px;
        height: 15px;
    }

    &:hover svg,
    &:focus svg {
        fill: $white;
    }
}

.button {
    margin-top: 20px;
    width: 255px;
}

.line {
    height: 1px;
    background-color: #dfd9ee;
    border: none;
    margin-top: 20px;
    position: absolute;
    width: 100%;
    margin-left: -5%;
}
</style>
