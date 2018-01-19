import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProyCeroTablaTrenesModule } from './tabla-trenes/tabla-trenes.module';
import { ProyCeroEstacionModule } from './estacion/estacion.module';
import { ProyCeroLineaModule } from './linea/linea.module';
import { ProyCeroEventoModule } from './evento/evento.module';
import { ProyCeroFechaModule } from './fecha/fecha.module';
import { ProyCeroTrenModule } from './tren/tren.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ProyCeroTablaTrenesModule,
        ProyCeroEstacionModule,
        ProyCeroLineaModule,
        ProyCeroEventoModule,
        ProyCeroFechaModule,
        ProyCeroTrenModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProyCeroEntityModule {}
