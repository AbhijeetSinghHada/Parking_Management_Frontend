import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AddUpdateSpaceComponent } from './add-update-space.component';
import { ParkingSpaceService } from '../service/parking-space.service';
import { BehaviorSubject, of } from 'rxjs';

describe('AddUpdateSpaceComponent', () => {
  let component: AddUpdateSpaceComponent;
  let fixture: ComponentFixture<AddUpdateSpaceComponent>;
  let mockParkingSpaceService: jasmine.SpyObj<ParkingSpaceService>;

  beforeEach(async () => {
    mockParkingSpaceService = jasmine.createSpyObj(
      'ParkingSpaceService',
      ['updateParkingSpace', 'addParkingSpace'],
      {
        parkingSpaceDetails: new BehaviorSubject({
          edit: true,
          formTitle: 'Test',
          parkingCategory: 'Test',
          totalCapacity: 100,
          charges: 10,
        }),
        selectedParkingSpace: new BehaviorSubject({
          slot_type: 'Test',
          total_capacity: 100,
          charge: 10,
        }),
      }
    );

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      declarations: [AddUpdateSpaceComponent],
      providers: [
        { provide: ParkingSpaceService, useValue: mockParkingSpaceService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call updateParkingSpace when functionalParkingDetails.edit is true', () => {
      const formValue = <NgForm>{
        value: {
          parkingCategory: 'Test',
          totalCapacity: 100,
          charges: 10,
        },
      };
      component.functionalParkingDetails = { edit: true };
      mockParkingSpaceService.updateParkingSpace.and.returnValue(of({}));

      component.onSubmit(formValue);

      expect(mockParkingSpaceService.updateParkingSpace).toHaveBeenCalledWith({
        slot_type: formValue.value.parkingCategory,
        total_capacity: formValue.value.totalCapacity,
        charge: formValue.value.charges,
      });
    });

    it('should call addParkingSpace when functionalParkingDetails.edit is false', () => {
      const formValue = <NgForm>{
        value: {
          parkingCategory: 'Test',
          totalCapacity: 100,
          charges: 10,
        },
      };
      component.functionalParkingDetails = { edit: false };
      mockParkingSpaceService.addParkingSpace.and.returnValue(of({}));

      component.onSubmit(formValue as NgForm);

      expect(mockParkingSpaceService.addParkingSpace).toHaveBeenCalledWith({
        slot_type: formValue.value.parkingCategory,
        total_capacity: formValue.value.totalCapacity,
        charge: formValue.value.charges,
      });
    });
  });

  describe('closeOverlay', () => {
    it('should emit closeOverlayEvent', () => {
      spyOn(component.closeOverlayEvent, 'emit');

      component.closeOverlay(new Event('click'));

      expect(component.closeOverlayEvent.emit).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from parkingServiceSubscription and selectedParkingSubscription', () => {
      spyOn(component.parkingServiceSubscription, 'unsubscribe');
      spyOn(component.selectedParkingSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(
        component.parkingServiceSubscription.unsubscribe
      ).toHaveBeenCalled();
      expect(
        component.selectedParkingSubscription.unsubscribe
      ).toHaveBeenCalled();
    });
  });
});
