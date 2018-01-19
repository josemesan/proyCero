import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TrenComponent } from './tren.component';
import { TrenDetailComponent } from './tren-detail.component';
import { TrenPopupComponent } from './tren-dialog.component';
import { TrenDeletePopupComponent } from './tren-delete-dialog.component';

export const trenRoute: Routes = [
    {
        path: 'tren',
        component: TrenComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trens'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tren/:id',
        component: TrenDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trens'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trenPopupRoute: Routes = [
    {
        path: 'tren-new',
        component: TrenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tren/:id/edit',
        component: TrenPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tren/:id/delete',
        component: TrenDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Trens'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
