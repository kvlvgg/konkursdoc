import ModalWrapper from '~/components/helpers/modal/ModalWrapper.vue';

export default function show(modalId, wrapperConfig, component, props, events) {
    return new Promise(resolve => {
        const h = this.$createElement;
        const hideModal = () => {
            resolve(false);
            this.$modal().close(modalId);
        };

        const vnode = h(component, {
            props: { ...props, resolve },
            on: { ...events, close: hideModal, change: result => resolve(result) },
        });

        const wrapper = wrapperConfig
            ? h(
                  ModalWrapper,

                  Object.assign({}, wrapperConfig, {
                      on: { ...wrapperConfig.on, close: hideModal },
                  }),

                  [vnode]
              )
            : null;

        this.$bvModal.msgBoxOk([wrapper || vnode], {
            id: modalId,
            size: 'sm',
            footerClass: 'd-none',
            modalClass: 'modal-content-only',
            dialogClass: 'custom-dialog-class',
            centered: true,
            noStacking: true,
        });
    });
}
