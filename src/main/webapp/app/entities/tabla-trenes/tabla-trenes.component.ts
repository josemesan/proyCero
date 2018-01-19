import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { TablaTrenes } from './tabla-trenes.model';
import { TablaTrenesService } from './tabla-trenes.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tabla-trenes',
    templateUrl: './tabla-trenes.component.html'
})
export class TablaTrenesComponent implements OnInit, OnDestroy {
tablaTrenes: TablaTrenes[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tablaTrenesService: TablaTrenesService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tablaTrenesService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tablaTrenes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTablaTrenes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TablaTrenes) {
        return item.id;
    }
    registerChangeInTablaTrenes() {
        this.eventSubscriber = this.eventManager.subscribe('tablaTrenesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
