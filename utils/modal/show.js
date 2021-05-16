import ModalWrapper from '~/components/helpers/modal/ModalWrapper.vue';

export default function show(modalId, component, props, events) {
  return new Promise(resolve => {
    const h = this.$createElement;
    const hideModal = () => {
      resolve(false);
      this.$modal().close(modalId);
    };

    const vnode = h(component, {
      props: { ...props, resolve },
      on: { ...events, close: hideModal },
    });

    const wrapper = h(
      ModalWrapper,
      {
        on: { close: hideModal },
      },
      [vnode]
    );

    this.$bvModal.msgBoxOk([wrapper], {
      id: modalId,
      size: 'sm',
      footerClass: 'd-none',
      modalClass: this.$route.name === 'index' ? 'modal-content-only' : '',
      dialogClass: 'custom-dialog-class',
      centered: true,
      noStacking: true,
    });
  });
}
