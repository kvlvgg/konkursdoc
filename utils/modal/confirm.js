/* Заготовка для стандартной модальной формы подтверждения */
export default function confirm({ message, title }) {
  const id = 'confirm-form';

  return new Promise(resolve => {
    const messageVNode = this.$createElement('', {
      props: {
        modalId: id,
        title,
        message,
        resolve,
      },
    });

    this.$bvModal.msgBoxOk([messageVNode], {
      id,
      size: 'sm',
      footerClass: 'd-none',
      modalClass: 'modal-content-only',
      centered: true,
      noStacking: true,
    });

    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      if (modalId === id) resolve(false);
    });
  });
}
