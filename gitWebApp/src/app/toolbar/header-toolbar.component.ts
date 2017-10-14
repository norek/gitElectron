import { Component, OnInit } from '@angular/core';
import { RepositoryOptionsService } from '../services/repository-options.service';
import { GravatarService } from '../services/external/gravatar.service';

@Component({
    selector: 'header-toolbar',
    templateUrl: 'header-toolbar.component.html',
    styleUrls: ['header-toolbar.component.scss']
})

export class HeaderToolbarComponent implements OnInit {

    private userName: string;
    private avatarUrl: string;
    private avatarExists: boolean;

    constructor(private repositoryOptionsService: RepositoryOptionsService, private gravatarService: GravatarService) {
    }

    ngOnInit() {
        this.repositoryOptionsService.configration.subscribe(s => {
            this.userName = s.user.name;

            if (s.user.email && s.user.email !== '') {
                this.gravatarService.getAvatar(s.user.email).subscribe(result => {
                    if (result.status === 200) {
                        this.avatarExists = true;
                        this.avatarUrl = result.url;
                    } else {
                        this.avatarExists = false;
                    }
                });
            }
        });
    }
}
