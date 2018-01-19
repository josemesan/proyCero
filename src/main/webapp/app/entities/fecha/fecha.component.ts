import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { Fecha } from './fecha.model';
import { FechaService } from './fecha.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-fecha',
    templateUrl: './fecha.component.html'
})
export class FechaComponent implements OnInit, OnDestroy {
fechas: Fecha[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fechaService: FechaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fechaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.fechas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFechas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Fecha) {
        return item.id;
    }
    registerChangeInFechas() {
        this.eventSubscriber = this.eventManager.subscribe('fechaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
