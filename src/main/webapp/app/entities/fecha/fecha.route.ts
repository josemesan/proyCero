import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FechaComponent } from './fecha.component';
import { FechaDetailComponent } from './fecha-detail.component';
import { FechaPopupComponent } from './fecha-dialog.component';
import { FechaDeletePopupComponent } from './fecha-delete-dialog.component';

export const fechaRoute: Routes = [
    {
        path: 'fecha',
        component: FechaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fechas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fecha/:id',
        component: FechaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fechas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fechaPopupRoute: Routes = [
    {
        path: 'fecha-new',
        component: FechaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fechas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fecha/:id/edit',
        component: FechaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fechas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fecha/:id/delete',
        component: FechaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Fechas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
