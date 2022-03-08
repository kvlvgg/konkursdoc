export default function shortName(value) {
    if (!value) return '';
    const name = value.split(' ');
    const lastname = name[0];
    const firstname = name[1];
    const middlename = name[2];

    let shortname = '';
    if (lastname) shortname += lastname;
    if (lastname && firstname?.[0]) shortname += ' ' + firstname[0] + '.';
    if (lastname && firstname?.[0] && middlename?.[0]) shortname += ' ' + middlename[0] + '.';
    return shortname;
}
