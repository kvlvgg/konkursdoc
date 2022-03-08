<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Замена проекта!</div>

        <div class="font-weight-bold custom-form-message sm" :class="$style['first-message']">
            Вы действительно хотите перезаписать<br />
            содержимое проекта?
        </div>

        <div class="custom-form-message">
            Все документы, находящиеся в проекте,<br />
            будут не актуальны
        </div>

        <div class="custom-modal-button" :class="$style['margin-bottom']">
            <b-button block variant="primary" @click="$emit('close')"> Подтвердить </b-button>
        </div>

        <div class="custom-modal-button">
            <b-button block variant="light" @click="$emit('close')"> Отмена </b-button>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.first-message {
    color: #4a427d;
}

.margin-bottom {
    margin-bottom: 1rem;
}
</style>
