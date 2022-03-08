import xlsx from 'xlsx';

export default function exprort2Excel(table, items, documentName) {
    const book = xlsx.utils.table_to_book(table, { raw: true });
    const sheet = book.Sheets.Sheet1;
    const rowsCount = items.length;

    for (let i = 2; i <= rowsCount + 1; i++) {
        const price = sheet[`I${i}`].v.replace(/[\s₽$]/g, '').replace(/\,/g, '.');
        sheet[`I${i}`].v = parseFloat(price);
        sheet[`I${i}`].t = 'n';

        delete sheet[`J${i}`].v;
        sheet[`J${i}`].f = `H${i}*I${i}`;
        sheet[`J${i}`].t = 'n';
    }

    delete sheet[`J${rowsCount + 2}`].v;
    sheet[`J${rowsCount + 2}`].f = `SUM(J2:J${rowsCount + 1})`;
    sheet[`J${rowsCount + 2}`].t = 'n';

    // xlsx.writeFile(book, `${documentName}.xlsx`);
    // xlsx.utils

    const content = xlsx.write(book, {
        type: 'base64',
        bookType: 'xlsx',
    });

    const b = xlsx.read(content);

    console.log(b);
}
