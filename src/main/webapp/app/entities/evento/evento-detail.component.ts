import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Evento } from './evento.model';
import { EventoService } from './evento.service';

@Component({
    selector: 'jhi-evento-detail',
    templateUrl: './evento-detail.component.html'
})
export class EventoDetailComponent implements OnInit, OnDestroy {

    evento: Evento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventoService: EventoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEventos();
    }

    load(id) {
        this.eventoService.find(id).subscribe((evento) => {
            this.evento = evento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEventos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventoListModification',
            (response) => this.load(this.evento.id)
        );
    }
}
