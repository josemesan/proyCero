import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TablaTrenes } from './tabla-trenes.model';
import { TablaTrenesPopupService } from './tabla-trenes-popup.service';
import { TablaTrenesService } from './tabla-trenes.service';

@Component({
    selector: 'jhi-tabla-trenes-dialog',
    templateUrl: './tabla-trenes-dialog.component.html'
})
export class TablaTrenesDialogComponent implements OnInit {

    tablaTrenes: TablaTrenes;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tablaTrenesService: TablaTrenesService,
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
        if (this.tablaTrenes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tablaTrenesService.update(this.tablaTrenes));
        } else {
            this.subscribeToSaveResponse(
                this.tablaTrenesService.create(this.tablaTrenes));
        }
    }

    private subscribeToSaveResponse(result: Observable<TablaTrenes>) {
        result.subscribe((res: TablaTrenes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TablaTrenes) {
        this.eventManager.broadcast({ name: 'tablaTrenesListModification', content: 'OK'});
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
    selector: 'jhi-tabla-trenes-popup',
    template: ''
})
export class TablaTrenesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tablaTrenesPopupService: TablaTrenesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tablaTrenesPopupService
                    .open(TablaTrenesDialogComponent as Component, params['id']);
            } else {
                this.tablaTrenesPopupService
                    .open(TablaTrenesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
