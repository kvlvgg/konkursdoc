import { Jodit } from 'jodit';
import saveAs from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';

Jodit.modules.Export2Docx = function (editor) {
  this.exec = function (filename) {
    let html = editor.editor.innerHTML;
    html = html.replace(/(border="0")/g, 'border="1"');
    asBlob(html).then(data => {
      saveAs(data, `${filename}.docx`);
    });
  };
};

Jodit.modules.Print = function (editor) {
  this.exec = function () {
    const iframe = document.createElement('iframe'); // create the element
    document.body.appendChild(iframe); // insert the element to the DOM

    iframe.contentWindow.document.write(editor.editor.innerHTML); // write the HTML to be printed
    iframe.contentWindow.print(); // print it
    document.body.removeChild(iframe); // remove the iframe from the DOM
  };
};

Jodit.plugins.add('kd-extension', function (editor) {
  editor.events.on('afterInit', function () {
    editor.Export2Docx = new Jodit.modules.Export2Docx(editor);
  });

  editor.events.on('afterInit', function () {
    editor.Print = new Jodit.modules.Print(editor);
  });
});

export default Jodit;
