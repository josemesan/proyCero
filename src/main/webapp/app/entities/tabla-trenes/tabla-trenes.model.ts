import { BaseEntity } from './../../shared';

export class TablaTrenes implements BaseEntity {
    constructor(
        public id?: number,
        public numeroTrenes?: number,
    ) {
    }
}
