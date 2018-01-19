import { BaseEntity } from './../../shared';

export const enum NombreLinea {
    'L2',
    'L3',
    'L4',
    'L5',
    'L7',
    'L8',
    'L9',
    'L10',
    'L11',
    'L12',
    'RAMAL'
}

export class Linea implements BaseEntity {
    constructor(
        public id?: number,
        public nombreLinea?: NombreLinea,
        public tablaTrenes?: BaseEntity,
        public estacions?: BaseEntity[],
    ) {
    }
}
