import { BaseEntity } from './../../shared';

export const enum TipoEstacion {
    'CABECERA',
    'NOCABECERA'
}

export const enum Via {
    'UNO',
    'DOS'
}

export class Estacion implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public nemo?: string,
        public tipoEstacion?: TipoEstacion,
        public via?: Via,
        public linea?: BaseEntity,
    ) {
    }
}
