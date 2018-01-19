import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProyCeroSharedModule } from '../../shared';
import {
    LineaService,
    LineaPopupService,
    LineaComponent,
    LineaDetailComponent,
    LineaDialogComponent,
    LineaPopupComponent,
    LineaDeletePopupComponent,
    LineaDeleteDialogComponent,
    lineaRoute,
    lineaPopupRoute,
    LineaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lineaRoute,
    ...lineaPopupRoute,
];

@NgModule({
    imports: [
        ProyCeroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LineaComponent,
        LineaDetailComponent,
        LineaDialogComponent,
        LineaDeleteDialogComponent,
        LineaPopupComponent,
        LineaDeletePopupComponent,
    ],
    entryComponents: [
        LineaComponent,
        LineaDialogComponent,
        LineaPopupComponent,
        LineaDeleteDialogComponent,
        LineaDeletePopupComponent,
    ],
    providers: [
        LineaService,
        LineaPopupService,
        LineaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProyCeroLineaModule {}
