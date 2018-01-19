import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoPopupService } from './evento-popup.service';
import { EventoService } from './evento.service';
import { Linea, LineaService } from '../linea';
import { Fecha, FechaService } from '../fecha';
import { Tren, TrenService } from '../tren';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-evento-dialog',
    templateUrl: './evento-dialog.component.html'
})
export class EventoDialogComponent implements OnInit {

    evento: Evento;
    isSaving: boolean;

    lineas: Linea[];

    fechas: Fecha[];

    trens: Tren[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventoService: EventoService,
        private lineaService: LineaService,
        private fechaService: FechaService,
        private trenService: TrenService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lineaService
            .query({filter: 'evento-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.evento.linea || !this.evento.linea.id) {
                    this.lineas = res.json;
                } else {
                    this.lineaService
                        .find(this.evento.linea.id)
                        .subscribe((subRes: Linea) => {
                            this.lineas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.fechaService
            .query({filter: 'evento-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.evento.fecha || !this.evento.fecha.id) {
                    this.fechas = res.json;
                } else {
                    this.fechaService
                        .find(this.evento.fecha.id)
                        .subscribe((subRes: Fecha) => {
                            this.fechas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.trenService
            .query({filter: 'evento-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.evento.tren || !this.evento.tren.id) {
                    this.trens = res.json;
                } else {
                    this.trenService
                        .find(this.evento.tren.id)
                        .subscribe((subRes: Tren) => {
                            this.trens = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventoService.update(this.evento));
        } else {
            this.subscribeToSaveResponse(
                this.eventoService.create(this.evento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Evento>) {
        result.subscribe((res: Evento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Evento) {
        this.eventManager.broadcast({ name: 'eventoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLineaById(index: number, item: Linea) {
        return item.id;
    }

    trackFechaById(index: number, item: Fecha) {
        return item.id;
    }

    trackTrenById(index: number, item: Tren) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-evento-popup',
    template: ''
})
export class EventoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component, params['id']);
            } else {
                this.eventoPopupService
                    .open(EventoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
