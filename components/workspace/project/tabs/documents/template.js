const template = `<p style="text-align: center;">
    <strong>
        Сведения о предлагаемых к поставке товарах<br>
        по предмету аукциона в электронной форме
    </strong>
</p>

<p align="justify" style="text-indent: 0.49in; margin-bottom: 0in;">
    Мы согласны на поставку товаров, соответствующих требованиям документации электронного аукциона,
    на условиях, предусмотренных документацией электронного аукциона.<br>
</p>

<p align="justify" style="text-indent: 0.49in; margin-top: 0in;">
Наименование и количество предлагаемого к поставке товара:
</p>

<table border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse; text-align: center;">
    <thead>
        <tr>
            <th width="50px" style="padding: 5px">№<br>п/п</th>
            <th style="padding: 5px">Название товара</th>
            <th style="padding: 5px">Товарный знак</th>
            <th style="padding: 5px">Страна происхождения</th>
            <th style="padding: 5px">Характеристики товара</th>
            <th style="padding: 5px">Кол-во</th>
        </tr>
    </thead>

    <tbody>
        %% tbodyInner %%
    </tbody>
</table>

<p align="justify" style="text-indent: 0.49in; margin-top: 0.2in;">
    Поставляемый товар является новым (товаром, который не был в употреблении, в ремонте,
    в том числе, который не был восстановлен, у которого не была осуществлена замена составных частей,
    не были восстановлены потребительские свойства), упакованным в заводскую упаковку.
</p>`;

/**
 * Генерирует шаблон заявки
 * @param Array items  - позиции в спецификации, на основе них формируется tbody
 * @returns String - шаблон
 */
export default function generateTemplate(items) {
  let tbodyInner = '';
  items.forEach(
    x =>
      (tbodyInner += `<tr>
        <td>${x.RowNum}</td>
        <td>${x.Type}<br/>${x.Partnumber}</td>
        <td>${x.Vendor}</td>
        <td>${x.Country}</td>
        <td style="text-align: left;">
            ${(x.Description || '').replace(/[/]/g, ',')}. Цвет - ${x.Color}
        </td>
        <td>${x.Amount}</td>
    </tr>`)
  );
  return template.replace(/(%% tbodyInner %%)/, tbodyInner);
}
