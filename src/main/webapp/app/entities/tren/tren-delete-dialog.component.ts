import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tren } from './tren.model';
import { TrenPopupService } from './tren-popup.service';
import { TrenService } from './tren.service';

@Component({
    selector: 'jhi-tren-delete-dialog',
    templateUrl: './tren-delete-dialog.component.html'
})
export class TrenDeleteDialogComponent {

    tren: Tren;

    constructor(
        private trenService: TrenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trenListModification',
                content: 'Deleted an tren'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tren-delete-popup',
    template: ''
})
export class TrenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trenPopupService: TrenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trenPopupService
                .open(TrenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
