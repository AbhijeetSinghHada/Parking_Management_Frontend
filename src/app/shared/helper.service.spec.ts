import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { jwtDecode } from 'jwt-decode';
import { HelperService } from './helper.service';
import { User } from './user.model';

describe('HelperService', () => {
  let helperService: HelperService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HelperService, HttpClient],
    });
    helperService = TestBed.inject(HelperService);
  });
  describe('getDecodedAccessToken', () => {
    it('should return decoded token', () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      expect(helperService.getDecodedAccessToken(token)).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
      });
    });
    it('should return null if token is invalid', () => {
      const token = 'invalid_token';
      expect(helperService.getDecodedAccessToken(token)).toBeNull();
    });
  });
  describe('UserModel', () => {
    it('should return user token', () => {
      const user = new User('test', ['admin'], new Date(), 'token');

      expect(user.token).toBe('token');
    });
    it('should return null if expired', () => {
      const user = new User(
        'test',
        ['admin'],
        new Date(new Date().getTime() - 10000),
        'token'
      );
      expect(user.token).toBe(null);
    });
  });
});
