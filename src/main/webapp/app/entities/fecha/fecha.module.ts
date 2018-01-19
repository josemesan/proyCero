import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProyCeroSharedModule } from '../../shared';
import {
    FechaService,
    FechaPopupService,
    FechaComponent,
    FechaDetailComponent,
    FechaDialogComponent,
    FechaPopupComponent,
    FechaDeletePopupComponent,
    FechaDeleteDialogComponent,
    fechaRoute,
    fechaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fechaRoute,
    ...fechaPopupRoute,
];

@NgModule({
    imports: [
        ProyCeroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FechaComponent,
        FechaDetailComponent,
        FechaDialogComponent,
        FechaDeleteDialogComponent,
        FechaPopupComponent,
        FechaDeletePopupComponent,
    ],
    entryComponents: [
        FechaComponent,
        FechaDialogComponent,
        FechaPopupComponent,
        FechaDeleteDialogComponent,
        FechaDeletePopupComponent,
    ],
    providers: [
        FechaService,
        FechaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProyCeroFechaModule {}
