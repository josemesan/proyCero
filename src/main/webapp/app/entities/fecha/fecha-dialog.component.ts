import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Fecha } from './fecha.model';
import { FechaPopupService } from './fecha-popup.service';
import { FechaService } from './fecha.service';

@Component({
    selector: 'jhi-fecha-dialog',
    templateUrl: './fecha-dialog.component.html'
})
export class FechaDialogComponent implements OnInit {

    fecha: Fecha;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fechaService: FechaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fecha.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fechaService.update(this.fecha));
        } else {
            this.subscribeToSaveResponse(
                this.fechaService.create(this.fecha));
        }
    }

    private subscribeToSaveResponse(result: Observable<Fecha>) {
        result.subscribe((res: Fecha) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Fecha) {
        this.eventManager.broadcast({ name: 'fechaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-fecha-popup',
    template: ''
})
export class FechaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechaPopupService: FechaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fechaPopupService
                    .open(FechaDialogComponent as Component, params['id']);
            } else {
                this.fechaPopupService
                    .open(FechaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
