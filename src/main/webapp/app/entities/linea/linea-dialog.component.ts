import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Linea } from './linea.model';
import { LineaPopupService } from './linea-popup.service';
import { LineaService } from './linea.service';
import { TablaTrenes, TablaTrenesService } from '../tabla-trenes';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-linea-dialog',
    templateUrl: './linea-dialog.component.html'
})
export class LineaDialogComponent implements OnInit {

    linea: Linea;
    isSaving: boolean;

    tablatrenes: TablaTrenes[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lineaService: LineaService,
        private tablaTrenesService: TablaTrenesService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tablaTrenesService
            .query({filter: 'linea-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.linea.tablaTrenes || !this.linea.tablaTrenes.id) {
                    this.tablatrenes = res.json;
                } else {
                    this.tablaTrenesService
                        .find(this.linea.tablaTrenes.id)
                        .subscribe((subRes: TablaTrenes) => {
                            this.tablatrenes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.linea.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lineaService.update(this.linea));
        } else {
            this.subscribeToSaveResponse(
                this.lineaService.create(this.linea));
        }
    }

    private subscribeToSaveResponse(result: Observable<Linea>) {
        result.subscribe((res: Linea) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Linea) {
        this.eventManager.broadcast({ name: 'lineaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTablaTrenesById(index: number, item: TablaTrenes) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-linea-popup',
    template: ''
})
export class LineaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lineaPopupService: LineaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lineaPopupService
                    .open(LineaDialogComponent as Component, params['id']);
            } else {
                this.lineaPopupService
                    .open(LineaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
