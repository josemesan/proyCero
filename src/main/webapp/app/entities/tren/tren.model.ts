import { BaseEntity } from './../../shared';

export class Tren implements BaseEntity {
    constructor(
        public id?: number,
        public numero?: string,
        public viajeros?: string,
    ) {
    }
}
