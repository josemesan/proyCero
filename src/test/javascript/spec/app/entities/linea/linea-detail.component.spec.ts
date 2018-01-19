/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ProyCeroTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LineaDetailComponent } from '../../../../../../main/webapp/app/entities/linea/linea-detail.component';
import { LineaService } from '../../../../../../main/webapp/app/entities/linea/linea.service';
import { Linea } from '../../../../../../main/webapp/app/entities/linea/linea.model';

describe('Component Tests', () => {

    describe('Linea Management Detail Component', () => {
        let comp: LineaDetailComponent;
        let fixture: ComponentFixture<LineaDetailComponent>;
        let service: LineaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProyCeroTestModule],
                declarations: [LineaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LineaService,
                    JhiEventManager
                ]
            }).overrideTemplate(LineaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LineaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LineaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Linea(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.linea).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
