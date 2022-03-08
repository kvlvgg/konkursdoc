export default function (date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ru-Ru');
}
