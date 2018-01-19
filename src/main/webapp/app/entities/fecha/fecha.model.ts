import { BaseEntity } from './../../shared';

export const enum TipoDia {
    'L',
    'V',
    'S',
    'F',
    'E'
}

export class Fecha implements BaseEntity {
    constructor(
        public id?: number,
        public dia?: string,
        public hora?: string,
        public tipoDia?: TipoDia,
    ) {
    }
}
