import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProyCeroSharedModule } from '../../shared';
import {
    TrenService,
    TrenPopupService,
    TrenComponent,
    TrenDetailComponent,
    TrenDialogComponent,
    TrenPopupComponent,
    TrenDeletePopupComponent,
    TrenDeleteDialogComponent,
    trenRoute,
    trenPopupRoute,
} from './';

const ENTITY_STATES = [
    ...trenRoute,
    ...trenPopupRoute,
];

@NgModule({
    imports: [
        ProyCeroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TrenComponent,
        TrenDetailComponent,
        TrenDialogComponent,
        TrenDeleteDialogComponent,
        TrenPopupComponent,
        TrenDeletePopupComponent,
    ],
    entryComponents: [
        TrenComponent,
        TrenDialogComponent,
        TrenPopupComponent,
        TrenDeleteDialogComponent,
        TrenDeletePopupComponent,
    ],
    providers: [
        TrenService,
        TrenPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProyCeroTrenModule {}
