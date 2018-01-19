import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TablaTrenes } from './tabla-trenes.model';
import { TablaTrenesService } from './tabla-trenes.service';

@Component({
    selector: 'jhi-tabla-trenes-detail',
    templateUrl: './tabla-trenes-detail.component.html'
})
export class TablaTrenesDetailComponent implements OnInit, OnDestroy {

    tablaTrenes: TablaTrenes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tablaTrenesService: TablaTrenesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTablaTrenes();
    }

    load(id) {
        this.tablaTrenesService.find(id).subscribe((tablaTrenes) => {
            this.tablaTrenes = tablaTrenes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTablaTrenes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tablaTrenesListModification',
            (response) => this.load(this.tablaTrenes.id)
        );
    }
}
