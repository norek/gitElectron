import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RepositoryConfigurationComponent } from './repository-configuration.component';

@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [RepositoryConfigurationComponent],
    providers: [],
    entryComponents: [RepositoryConfigurationComponent]
})
export class RepositoryConfigurationModule { }
