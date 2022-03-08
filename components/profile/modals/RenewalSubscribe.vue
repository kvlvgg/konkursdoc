<template>
    <div>
        <div class="font-weight-bold custom-modal-title">Продление подписки</div>

        <div class="custom-form-message">Настройте параметры подписки</div>

        <ListItem v-for="(feature, index) in features" :key="index" :class="$style['list-item']" :feature="feature" />

        <ListInput
            :class="$style['list-item']"
            :value="userCount"
            label="Количество пользователей"
            @input="userCount = $event"
        />

        <b-form-group>
            <div ref="buttons" :class="$style.buttons">
                <b-button
                    v-for="(payPlan, index) in payPlans"
                    :key="index"
                    :variant="payPlan.name === selectedPayPlan ? 'primary' : 'outline-primary'"
                    @click="selectedPayPlan = payPlan.name"
                >
                    {{ payPlan.name }}
                </b-button>
            </div>
        </b-form-group>

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
import ListItem from '~/components/profile/modals/helpers/ListItem.vue';
import ListInput from '~/components/profile/modals/helpers/ListInput.vue';
import PriceSection from '~/components/profile/modals/helpers/PriceSection.vue';

export default {
    components: {
        ListItem,
        ListInput,
        PriceSection,
    },

    data() {
        return {
            selectedPayPlan: 'Месяц',
            userCount: '3',
            features: ['Подбор картриджей', 'Авто расчёт стоимости', 'Формирование заявок'],
            payPlans: [
                {
                    name: 'Месяц',
                    price: 2000,
                },
                {
                    name: '3 месяца',
                    price: 1750,
                },
                {
                    name: '1 год',
                    price: 1500,
                },
            ],
        };
    },

    computed: {
        totalPrice() {
            const index = this.payPlans.findIndex(x => x.name === this.selectedPayPlan);

            if (this.userCount < 4) return this.payPlans[index].price;
            return this.payPlans[index].price + (this.userCount - 3) * 500;
        },
    },
};
</script>

<style module lang="scss">
.list-item {
    margin-bottom: rem(20);
}

.buttons {
    display: flex;
    justify-content: space-between;

    :global(.btn) {
        width: 31%;
        font-size: rem(11);
    }
}
</style>
