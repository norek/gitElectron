import { Component, Input} from '@angular/core';
import { DirectDiffHunk, DirectDiffLine } from '../../services/diff.service';

@Component({
    selector: 'direct-diff-hunk-lines',
    templateUrl: 'direct-diff-hunk-lines.component.html',
    styleUrls: ['direct-diff-hunk-lines.component.scss']
})
export class DirectDiffHunkLinesComponent {

    @Input() lines: DirectDiffLine[];

    constructor() {
    }

    private getLineClass(line: DirectDiffLine, index: number) : string {
        if(line.type == 'nonexistent') {
            if(index % 2)
                return 'content-nonexistent-odd';

            return 'content-nonexistent-even';
        }
        return 'content-' + line.type;
    }

    private getLineContent(line: DirectDiffLine) : string {
        
         if(line.content)
             return line.content;

         return '';
    }

    private getLineNumber(line: DirectDiffLine) : string {
        if(line.lineNumber != null && line.lineNumber > 0) 
            return line.lineNumber.toString();
        if(line.type == 'nonexistent')
            return '//';

        return ' ';
    }
}
