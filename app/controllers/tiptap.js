import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';

export default class BlogController extends Controller {
  @tracked namess = 'Font Eleniyan';
  @tracked count = 1002;
  @tracked editor = new Editor({
    element: document.querySelector('.editor'),
    extensions: [
      StarterKit,

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: 'Dungeonfog editor',
    autofocus: true,
    editable: true,
    onUpdate() {
      const json = this.getJSON();
      // send the content to an API here
      console.log(json.content[0].content[0].text);
      let data = json.content[0].content[0].text;
      const dbname = 'myDB';
      const requestDB = window.indexedDB.open(dbname);
      requestDB.updateneeded = () => {
        let db = requestDB.result;
        let store = db.createObjectStore('content');
        store.put({ content: data });
      };
      requestDB.onsuccess = () => {
        if (requestDB.readyState == 'done') {
          console.log('Success');
        }
      };
    },
  });

  // eslint-disable-next-line ember/classic-decorator-hooks
  init() {
    super.init(...arguments);
    this.loadInfo();
  }

  @action
  // load editor
  loadInfo() {
    setTimeout(() => {
      this.editor;
    }, 100);
  }

  // bold
  bold = () => {
    this.editor.chain().focus().toggleBold().run();
  };

  // italic
  italic = () => {
    this.editor.chain().focus().toggleItalic().run();
  };
  // ordered list
  orderedList = () => {
    this.editor.chain().focus().toggleOrderedList().run();
  };

  // bullet list
  bulletList = () => {
    this.editor.chain().focus().toggleBulletList().run();
  };

  // text align left
  textAlignLeft = () => {
    this.editor.chain().focus().setTextAlign('left').run();
  };

  // text align center
  textAlignCenter = () => {
    this.editor.chain().focus().setTextAlign('center').run();
  };

  // text algin right
  textAlignRight = () => {
    this.editor.chain().focus().setTextAlign('right').run();
  };
  // text justify
  textJustify = () => {
    this.editor.chain().focus().setTextAlign('justify').run();
  };
  // header one
  headingOne = () => {
    this.editor.chain().focus().toggleHeading({ level: 1 }).run();
  };

  // header two
  headingTwo = () => {
    this.editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  // heading 3
  headingThree = () => {
    this.editor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  // paragraph
  paragraph = () => {
    this.editor.chain().focus().setParagraph().run();
  };

  // clear
  clear = () => {
    this.editor.chain().focus().clearContent().run();
  };

  // print
  print = () => {
    let printContent = document.querySelector('.editor div').textContent;
    let printWindow = window.open('', '', 'height=500, width=1000');
    printWindow.document.write('<html>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };
}
