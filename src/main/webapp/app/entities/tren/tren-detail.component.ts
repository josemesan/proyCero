import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tren } from './tren.model';
import { TrenService } from './tren.service';

@Component({
    selector: 'jhi-tren-detail',
    templateUrl: './tren-detail.component.html'
})
export class TrenDetailComponent implements OnInit, OnDestroy {

    tren: Tren;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private trenService: TrenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTrens();
    }

    load(id) {
        this.trenService.find(id).subscribe((tren) => {
            this.tren = tren;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTrens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'trenListModification',
            (response) => this.load(this.tren.id)
        );
    }
}
