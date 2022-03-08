<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Расширение подписки</div>

        <div class="custom-form-message">Измените количество пользователей в вашей подписке</div>

        <ListInput
            :value="userCount"
            :class="$style['list-item']"
            label="Количество пользователей"
            @input="userCount = $event"
        />

        <b-form-group>
            <PriceSection :price="totalPrice" />
        </b-form-group>

        <b-form-group>
            <b-button class="custom-modal-button" block variant="gr-primary"> Отправить заявку </b-button>
        </b-form-group>

        <div class="custom-modal-question">Не открылся почтовый клиент?</div>

        <b-button variant="link" size="sm"> Скачайте заявку для отправки в ручную </b-button>
    </div>
</template>

<script>
import ListInput from '~/components/profile/modals/helpers/ListInput.vue';
import PriceSection from '~/components/profile/modals/helpers/PriceSection.vue';

export default {
    components: {
        ListInput,
        PriceSection,
    },

    data() {
        return {
            userCount: '3',
            price: 500,
        };
    },

    computed: {
        totalPrice() {
            if (this.userCount < 4) return this.price;
            return this.price + (this.userCount - 3) * 500;
        },
    },
};
</script>

<style module lang="scss">
.list-item {
    margin-bottom: rem(20);
}
</style>
