import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fecha } from './fecha.model';
import { FechaPopupService } from './fecha-popup.service';
import { FechaService } from './fecha.service';

@Component({
    selector: 'jhi-fecha-delete-dialog',
    templateUrl: './fecha-delete-dialog.component.html'
})
export class FechaDeleteDialogComponent {

    fecha: Fecha;

    constructor(
        private fechaService: FechaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fechaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fechaListModification',
                content: 'Deleted an fecha'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fecha-delete-popup',
    template: ''
})
export class FechaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechaPopupService: FechaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fechaPopupService
                .open(FechaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
