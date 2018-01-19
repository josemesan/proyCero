/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ProyCeroTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FechaDetailComponent } from '../../../../../../main/webapp/app/entities/fecha/fecha-detail.component';
import { FechaService } from '../../../../../../main/webapp/app/entities/fecha/fecha.service';
import { Fecha } from '../../../../../../main/webapp/app/entities/fecha/fecha.model';

describe('Component Tests', () => {

    describe('Fecha Management Detail Component', () => {
        let comp: FechaDetailComponent;
        let fixture: ComponentFixture<FechaDetailComponent>;
        let service: FechaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProyCeroTestModule],
                declarations: [FechaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FechaService,
                    JhiEventManager
                ]
            }).overrideTemplate(FechaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Fecha(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.fecha).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
