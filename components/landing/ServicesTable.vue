<template>
  <div :class="$style['table']">
    <div class="font-weight-bold" :class="$style['table-header']">
      <div :class="$style['row-header']">
        <div :class="$style['col-header']">№</div>
        <div :class="$style['col-header']">Производитель</div>
        <div :class="$style['col-header']">Партномер</div>
        <div :class="$style['col-header']">Ресурс</div>
        <div :class="$style['col-header']">Цвет</div>
        <div :class="$style['col-header']">% заполнения</div>
        <div :class="$style['col-header']">Добавление</div>
      </div>
    </div>

    <div class="font-weight-light" :class="$style['table-body']">
      <div
        v-for="(i, index) in tableData"
        :key="index"
        :class="$style['row-body']"
      >
        <div :class="$style['col-body']">{{ i.id }}</div>
        <div :class="$style['col-body']">{{ i.manufacturer }}</div>
        <div :class="$style['col-body']">{{ i.partnumber }}</div>
        <div :class="$style['col-body']">{{ i.resource }}</div>
        <div :class="$style['col-body']">{{ i.colour }}</div>
        <div :class="$style['col-body']">{{ i.filling }}</div>
        <div :class="$style['col-body']">
          <b-button size="sm" variant="link" @click="isModalVisible = true"
            >Показать</b-button
          >
        </div>
      </div>
    </div>

    <b-modal v-model="isModalVisible" hide-header hide-footer centered>
      <button
        type="button"
        class="close modal-content-btn-close"
        @click="isModalVisible = false"
      >
        <IconClose />
      </button>
      <div :class="$style['modal-content']">
        <div :class="$style['modal-title']">Совместимые устройства</div>
        <div :class="$style['modal-list']">
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 1</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 2</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 3</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 4</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 5</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 6</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 7</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 8</b-button>
          </div>
          <div :class="$style['modal-item']">
            <b-button variant="link">Название 9</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import IconClose from '~/components/icons/IconClose.vue';

export default {
  components: {
    IconClose,
  },

  data() {
    return {
      isModalVisible: false,
      tableData: [
        {
          id: 1,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 2,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 3,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 4,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 5,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 6,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 7,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 8,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 9,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
        {
          id: 10,
          manufacturer: 'Hewlett-Packard',
          partnumber: 'Q2612A',
          resource: '2 000 стр',
          colour: 'Чёрный',
          filling: '5%',
        },
      ],
    };
  },
};
</script>

<style module lang="scss">
@import '~/assets/scss/var.scss';

.table,
.table-header,
.table-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
}

.table-body {
  max-height: 275px;
  height: 100%;
  overflow-y: scroll;
}

.row-header,
.row-body {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  margin: 0 0 5px 0;
}

.row-header {
  color: #fff;
  background-color: $secondary;
  border-radius: 4px 4px 0px 0px;
  padding-right: 17px;
}

.row-body {
  background-color: #f8f8f8;
  border: 1px solid $secondary-lighter;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
}

.col-header,
.col-body {
  flex: 1 1 auto;
  width: 100%;
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  text-align: center;

  &:last-child {
    box-shadow: none;
  }

  &:nth-child(1) {
    max-width: 50px;
  }
  &:nth-child(5) {
    max-width: 94px;
  }
  &:nth-child(6) {
    max-width: 136px;
  }
  &:nth-child(7) {
    max-width: 136px;
  }
}

.col-header {
  box-shadow: 1px 0 0 0 #5a3ba3;
}

.col-body {
  box-shadow: 1px 0 0 0 #adadad;
}

.input-quantity {
  margin: 0 5px;
  text-align: center;
}

//////////////////////

.modal-content {
  display: block;
}

.modal-title {
  padding: 10px;
  font-size: 18px;
  color: #4a427d;
}

.modal-list {
  display: flex;
  flex-direction: column;
}

.modal-item {
  display: block;
}
</style>
