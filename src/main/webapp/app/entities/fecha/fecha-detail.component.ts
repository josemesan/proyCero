import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Fecha } from './fecha.model';
import { FechaService } from './fecha.service';

@Component({
    selector: 'jhi-fecha-detail',
    templateUrl: './fecha-detail.component.html'
})
export class FechaDetailComponent implements OnInit, OnDestroy {

    fecha: Fecha;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fechaService: FechaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFechas();
    }

    load(id) {
        this.fechaService.find(id).subscribe((fecha) => {
            this.fecha = fecha;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFechas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fechaListModification',
            (response) => this.load(this.fecha.id)
        );
    }
}
