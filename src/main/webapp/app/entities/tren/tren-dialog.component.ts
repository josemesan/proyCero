import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tren } from './tren.model';
import { TrenPopupService } from './tren-popup.service';
import { TrenService } from './tren.service';

@Component({
    selector: 'jhi-tren-dialog',
    templateUrl: './tren-dialog.component.html'
})
export class TrenDialogComponent implements OnInit {

    tren: Tren;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private trenService: TrenService,
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
        if (this.tren.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trenService.update(this.tren));
        } else {
            this.subscribeToSaveResponse(
                this.trenService.create(this.tren));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tren>) {
        result.subscribe((res: Tren) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tren) {
        this.eventManager.broadcast({ name: 'trenListModification', content: 'OK'});
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
    selector: 'jhi-tren-popup',
    template: ''
})
export class TrenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trenPopupService: TrenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trenPopupService
                    .open(TrenDialogComponent as Component, params['id']);
            } else {
                this.trenPopupService
                    .open(TrenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
