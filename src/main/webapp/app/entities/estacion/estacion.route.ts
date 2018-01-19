import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstacionComponent } from './estacion.component';
import { EstacionDetailComponent } from './estacion-detail.component';
import { EstacionPopupComponent } from './estacion-dialog.component';
import { EstacionDeletePopupComponent } from './estacion-delete-dialog.component';

export const estacionRoute: Routes = [
    {
        path: 'estacion',
        component: EstacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estacion/:id',
        component: EstacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estacionPopupRoute: Routes = [
    {
        path: 'estacion-new',
        component: EstacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estacion/:id/edit',
        component: EstacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estacion/:id/delete',
        component: EstacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Estacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
