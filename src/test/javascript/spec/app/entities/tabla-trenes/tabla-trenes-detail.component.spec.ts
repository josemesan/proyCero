/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ProyCeroTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TablaTrenesDetailComponent } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes-detail.component';
import { TablaTrenesService } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.service';
import { TablaTrenes } from '../../../../../../main/webapp/app/entities/tabla-trenes/tabla-trenes.model';

describe('Component Tests', () => {

    describe('TablaTrenes Management Detail Component', () => {
        let comp: TablaTrenesDetailComponent;
        let fixture: ComponentFixture<TablaTrenesDetailComponent>;
        let service: TablaTrenesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProyCeroTestModule],
                declarations: [TablaTrenesDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TablaTrenesService,
                    JhiEventManager
                ]
            }).overrideTemplate(TablaTrenesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TablaTrenesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TablaTrenesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TablaTrenes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tablaTrenes).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
