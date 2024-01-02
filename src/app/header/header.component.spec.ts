import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { VehicleService } from '../vehicle/service/vehicle.service';
import { User } from '../shared/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockVehicleService: jasmine.SpyObj<VehicleService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout'], {
      user: new BehaviorSubject(
        new User('test', ['TestRole1', 'TestRole2'], new Date(), 'testToken')
      ),
    });
    mockVehicleService = jasmine.createSpyObj('VehicleService', [], {
      vehicleOverlayToggle: {
        next: jasmine.createSpy('next'),
      },
    });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VehicleService, useValue: mockVehicleService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isAuthenticated to true when user is authenticated', () => {
    component.ngOnInit();
    expect(component.isAuthenticated).toBeTrue();
  });

  it('should set isAuthenticated to false when user is not authenticated', () => {
    mockAuthService.user.next(null);
    expect(component.isAuthenticated).toBeFalse();
  });

  it('should call vehicleOverlayToggle.next with true when onVehicle is called', () => {
    component.onVehicle();

    expect(mockVehicleService.vehicleOverlayToggle.next).toHaveBeenCalledWith(
      true
    );
  });

  it('should call authService.logout when onLogout is called', () => {
    component.onLogout();

    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should unsubscribe from user subscription when ngOnDestroy is called', () => {
    spyOn(component['userSub'], 'unsubscribe');

    component.ngOnDestroy();

    expect(component['userSub'].unsubscribe).toHaveBeenCalled();
  });
});
