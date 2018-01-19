import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProyCeroSharedModule } from '../../shared';
import {
    TablaTrenesService,
    TablaTrenesPopupService,
    TablaTrenesComponent,
    TablaTrenesDetailComponent,
    TablaTrenesDialogComponent,
    TablaTrenesPopupComponent,
    TablaTrenesDeletePopupComponent,
    TablaTrenesDeleteDialogComponent,
    tablaTrenesRoute,
    tablaTrenesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tablaTrenesRoute,
    ...tablaTrenesPopupRoute,
];

@NgModule({
    imports: [
        ProyCeroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TablaTrenesComponent,
        TablaTrenesDetailComponent,
        TablaTrenesDialogComponent,
        TablaTrenesDeleteDialogComponent,
        TablaTrenesPopupComponent,
        TablaTrenesDeletePopupComponent,
    ],
    entryComponents: [
        TablaTrenesComponent,
        TablaTrenesDialogComponent,
        TablaTrenesPopupComponent,
        TablaTrenesDeleteDialogComponent,
        TablaTrenesDeletePopupComponent,
    ],
    providers: [
        TablaTrenesService,
        TablaTrenesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProyCeroTablaTrenesModule {}
