import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LineaComponent } from './linea.component';
import { LineaDetailComponent } from './linea-detail.component';
import { LineaPopupComponent } from './linea-dialog.component';
import { LineaDeletePopupComponent } from './linea-delete-dialog.component';

@Injectable()
export class LineaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const lineaRoute: Routes = [
    {
        path: 'linea',
        component: LineaComponent,
        resolve: {
            'pagingParams': LineaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lineas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'linea/:id',
        component: LineaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lineas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lineaPopupRoute: Routes = [
    {
        path: 'linea-new',
        component: LineaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lineas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea/:id/edit',
        component: LineaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lineas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'linea/:id/delete',
        component: LineaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Lineas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
