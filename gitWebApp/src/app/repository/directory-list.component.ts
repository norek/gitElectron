import { Component, OnInit } from '@angular/core';
import { DirectoryService, DirectoryInfo, SubDirectoryInfo } from '../services/directory.service';
import { SystemOptionsService } from '../services/system-options.service';

@Component({
    selector: 'directory-list',
    templateUrl: 'directory-list.component.html',
    styleUrls: ['directory-list.component.scss']
})

export class DirectoryListComponent implements OnInit {

    private currentDirectory: DirectoryInfo;

    constructor(private directoryService: DirectoryService, private systemOptionsService: SystemOptionsService) {
    }

    ngOnInit() {
        this.loadDirectories('');
    }

    private mapRepository(directory: SubDirectoryInfo): void {
        this.systemOptionsService.mapRepository(directory.path)
            .subscribe(d => directory.isMapped = true);
    }

    private getChildDirectories(directory: DirectoryInfo) {
        this.loadDirectories(directory.path);
    }

    private goBack(): void {
        this.loadDirectories(this.currentDirectory.parentPath);
    }

    private loadDirectories(path: string) {
        this.directoryService.getDirectories(path).subscribe(dir => {
            this.currentDirectory = dir;
        });
    }

    private get subDirectories(): SubDirectoryInfo[] {
        if (this.currentDirectory) {
            return this.currentDirectory.subDirectories;
        }

        return [];
    }

    private get isRoot(): boolean {
        if (this.currentDirectory) {
            return this.currentDirectory.isRoot;
        }

        return false;
    }

    private getDirectoryIcon(directory: SubDirectoryInfo): string {
        if (directory.isGitDirectory) {
            if (directory.isMapped) {
                return 'done';
            } else {
                return 'get_app';
            }
        }

        return '';
    }
}
