import { Component, OnInit } from '@angular/core';
import { Branch, BranchService } from '../services/branch.service';

@Component({
    selector: 'branch-list',
    templateUrl: 'branch-list.component.html'
})

export class BranchListComponent implements OnInit {

    private branchList: Branch[] = [];

    constructor(private branchService: BranchService) { }

    ngOnInit() {
         this.branchService.GetAll().subscribe((branchList) => this.branchList = branchList);
    }
}
