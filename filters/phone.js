export default function phone(value) {
    if (!value) return '';

    const phoneMask = /^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/;
    const match = phoneMask.exec(value.replace(/\D/g, ''));
    if (match && (match[1] === '8' || match[1] === '7')) {
        return `+7 (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
    }

    return '+' + value.replace(/\D/g, '');
}
