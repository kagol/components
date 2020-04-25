import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import QuillBetterTable from 'quill-better-table'
import BlotFormatter, { AlignAction, DeleteAction, ResizeAction, ImageSpec } from 'quill-blot-formatter'

Quill.register({
  'modules/better-table': QuillBetterTable
}, true)

import katex from 'katex';
const win: any = window;
win.katex = katex;

Quill.register('modules/blotFormatter', BlotFormatter);

class CustomImageSpec extends ImageSpec {
    getActions() {
        return [AlignAction, DeleteAction, ResizeAction];
    }
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editor
  constructor() { }

  ngOnInit() {
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            // handlers object will be merged with default handlers object
            'better-table': function(value) {
              console.log('better table value:', value);
            }
          }
        },
        table: false,  // disable table module
        'better-table': {
          operationMenu: {
            items: {
              unmergeCells: {
                text: 'Another unmerge cells name'
              }
            }
          }
        },
        keyboard: {
          bindings: QuillBetterTable.keyboardBindings
        },
        blotFormatter: {
          specs: [
            CustomImageSpec,
          ],
          overlay: {
            style: {
              border: '2px solid red',
            }
          }
        }
      }
    });
  }

  insertTable() {
    const tableModule = this.editor.getModule('better-table');
    tableModule.insertTable(3, 3);
  }

}
