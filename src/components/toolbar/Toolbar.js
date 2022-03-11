import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
    constructor(root) {
        super(root, {
            name: 'Toolbar',
            listeners: ['click']
        });
    }
    static className = 'excel__toolbar'
    toHTML() {
        return `
            <div class="button" data-bold="true">
                <i class="material-icons md-48">format_bold</i>
            </div>
            <div class="button">
                <i class="material-icons md-48">format_italic</i>
            </div>
            <div class="button">
                <i class="material-icons md-48">format_underline</i>
            </div>
            <div class="button">
                <i class="material-icons md-48">format_align_left</i>
            </div>
            <div class="button">
                <i class="material-icons md-48">format_align_center</i>
            </div>
            <div class="button">
                <i class="material-icons md-48">format_align_right</i>
            </div>
        `
    }

    onClick(e) {
        console.log(e.target);
    }
}