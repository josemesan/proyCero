/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ProyCeroTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EventoDetailComponent } from '../../../../../../main/webapp/app/entities/evento/evento-detail.component';
import { EventoService } from '../../../../../../main/webapp/app/entities/evento/evento.service';
import { Evento } from '../../../../../../main/webapp/app/entities/evento/evento.model';

describe('Component Tests', () => {

    describe('Evento Management Detail Component', () => {
        let comp: EventoDetailComponent;
        let fixture: ComponentFixture<EventoDetailComponent>;
        let service: EventoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProyCeroTestModule],
                declarations: [EventoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EventoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EventoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Evento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.evento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
