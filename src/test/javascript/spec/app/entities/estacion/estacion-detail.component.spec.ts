/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ProyCeroTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstacionDetailComponent } from '../../../../../../main/webapp/app/entities/estacion/estacion-detail.component';
import { EstacionService } from '../../../../../../main/webapp/app/entities/estacion/estacion.service';
import { Estacion } from '../../../../../../main/webapp/app/entities/estacion/estacion.model';

describe('Component Tests', () => {

    describe('Estacion Management Detail Component', () => {
        let comp: EstacionDetailComponent;
        let fixture: ComponentFixture<EstacionDetailComponent>;
        let service: EstacionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProyCeroTestModule],
                declarations: [EstacionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstacionService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstacionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstacionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstacionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Estacion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estacion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
