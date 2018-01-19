/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ProyCeroTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TrenDetailComponent } from '../../../../../../main/webapp/app/entities/tren/tren-detail.component';
import { TrenService } from '../../../../../../main/webapp/app/entities/tren/tren.service';
import { Tren } from '../../../../../../main/webapp/app/entities/tren/tren.model';

describe('Component Tests', () => {

    describe('Tren Management Detail Component', () => {
        let comp: TrenDetailComponent;
        let fixture: ComponentFixture<TrenDetailComponent>;
        let service: TrenService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProyCeroTestModule],
                declarations: [TrenDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TrenService,
                    JhiEventManager
                ]
            }).overrideTemplate(TrenDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TrenDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrenService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tren(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tren).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
