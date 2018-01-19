import { BaseEntity } from './../../shared';

export const enum TipoEvento {
    'OCUPA',
    'LIBERA'
}

export class Evento implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipoEvento?: TipoEvento,
        public linea?: BaseEntity,
        public fecha?: BaseEntity,
        public tren?: BaseEntity,
    ) {
    }
}
