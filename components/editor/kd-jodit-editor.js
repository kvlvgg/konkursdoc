import { Jodit } from 'jodit';
import saveAs from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import print from '~/utils/print';

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
        print(editor.editor.innerHTML);
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
