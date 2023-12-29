import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/auth.service';
import { ParkingSpaceComponent } from './parking-space.component';
import {
  ParkingSpaceService,
  parkingSpace,
} from './service/parking-space.service';
import { Observable, Subject, of } from 'rxjs';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('Parking Space Component', () => {
  let component: ParkingSpaceComponent;
  let fixture: ComponentFixture<ParkingSpaceComponent>;
  let mockParkingSpaceService: ParkingSpaceService;
  let httpTestingController: HttpTestingController;

  let parkingSpaceTestList: parkingSpace[] = [
    {
      slot_type: 'LMV',
      total_capacity: 10,
      charge: 40,
    },
    {
      slot_type: 'HMV',
      total_capacity: 20,
      charge: 100,
    },
  ];

  beforeEach(async () => {
    mockParkingSpaceService = jasmine.createSpyObj(
      'ParkingSpaceService',
      {
        getParkingSpace: of(parkingSpaceTestList),
      },
      {
        selectedParkingSpace: {
          next: jasmine.createSpy('next'),
        },
      }
    );
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'parkingspace/:parkingCategory/slots',
            component: DummyComponent,
          },
        ]),
        ReactiveFormsModule,
      ],
      declarations: [ParkingSpaceComponent],
      providers: [
        {
          provide: ParkingSpaceService,
          useValue: mockParkingSpaceService,
        },
        {
          provide: AuthService,
          useValue: {
            user: of({ roles: ['Admin', 'Operator', 'oyhoye'] }),
          },
        },
      ],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ParkingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('toggleOverlay Function', () => {
    it('should toggle isOverlayOpen', () => {
      component.isOverlayOpen = false;
      component.toggleOverlay();
      expect(component.isOverlayOpen).toBeTruthy();
    });
  });
  describe('updateParkingSpace Function', () => {
    it('should call getParkingSpace function', () => {
      spyOn(component, 'SelectedCategory');
      component.updateParkingSpace();
      expect(mockParkingSpaceService.getParkingSpace).toHaveBeenCalled();
    });
    it('should set parkingSpaceList', () => {
      spyOn(component, 'SelectedCategory');
      component.updateParkingSpace();
      expect(component.parkingSpaceList).toEqual(parkingSpaceTestList);
      expect(component.SelectedCategory).toHaveBeenCalledWith(
        parkingSpaceTestList[0].slot_type
      );
    });
  });
  describe('SelectedCategory Function', () => {
    it('should set selectedCategory', () => {
      component.SelectedCategory(parkingSpaceTestList[0].slot_type);
      expect(component.selectedCategory).toEqual(
        parkingSpaceTestList[0].slot_type
      );
    });
    it('should call selectedParkingSpace.next', () => {
      component.SelectedCategory(parkingSpaceTestList[1].slot_type);
      expect(
        mockParkingSpaceService.selectedParkingSpace.next
      ).toHaveBeenCalledWith(parkingSpaceTestList[1]);
    });
  });
});
