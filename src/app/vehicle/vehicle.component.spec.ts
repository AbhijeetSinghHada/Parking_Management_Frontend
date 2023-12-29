import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParkingSpaceService } from '../home/parking-space/service/parking-space.service';
import { VehicleService } from './service/vehicle.service';
import { MessageService } from 'primeng/api';
import { VehicleComponent } from './vehicle.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('Vehicle Component', () => {
  let mockParkingService: jasmine.SpyObj<ParkingSpaceService>;
  let mockvehicleService: jasmine.SpyObj<VehicleService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let fixture: ComponentFixture<VehicleComponent>;
  let component: VehicleComponent;
  const testParkingData = [
    {
      slot_type: 'Test 1',
      total_capacity: 75,
      charge: 1000,
    },
    {
      slot_type: 'Test 2',
      total_capacity: 180,
      charge: 250,
    },
  ];
  const formData = <NgForm>{
    value: {
      vehicle_number: 'RJ20CD7259',
      vehicle_type: 'LMV',
      customer: {
        name: 'Test',
        email_address: 'test@gmail.com',
        phone_number: '1234567890',
      },
    },
  };
  beforeEach(() => {
    mockParkingService = jasmine.createSpyObj(
      'ParkingSpaceService',
      {},
      {
        listParkingSpace: testParkingData,
      }
    );
    mockvehicleService = jasmine.createSpyObj('VehicleService', {
      vehicleOverlayToggle: {
        next: jasmine.createSpy('next'),
      },
      add_vehicle: of({ message: 'Vehicle Added Successfully' }),
    });
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [VehicleComponent],
      providers: [
        { provide: ParkingSpaceService, useValue: mockParkingService },
        { provide: VehicleService, useValue: mockvehicleService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('OnSubmit Function', () => {
    it('should get the value of form and call add_vehicle from vehicle service', () => {
      spyOn(component, 'closeOverlay');
      component.onSubmit(formData);
      expect(mockvehicleService.add_vehicle).toHaveBeenCalledWith(
        formData.value
      );
    });
  });
  describe('closeOverlay Function', () => {
    it('should call vehicleOverlayToggle from vehicle service', () => {
      mockvehicleService.vehicleOverlayToggle.next = jasmine.createSpy('next');
      component.closeOverlay();
      expect(mockvehicleService.vehicleOverlayToggle.next).toHaveBeenCalledWith(
        false
      );
    });
  });
});
