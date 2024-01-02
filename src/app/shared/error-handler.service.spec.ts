import { MessageService } from 'primeng/api';
import { ResponseHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let errorHandlerService: ResponseHandlerService;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    messageService = jasmine.createSpyObj('MessageService', ['add']);
    errorHandlerService = new ResponseHandlerService(messageService);
  });

  it('should handle unknown error', () => {
    const error = { error: { error: { message: undefined } } };
    errorHandlerService.handleError(error);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      detail: 'An unknown error occurred!',
    });
  });

  it('should handle specific error message', () => {
    const errorMessage = 'Specific error message';
    const error = { error: { error: { message: errorMessage } } };
    errorHandlerService.handleError(error);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      detail: errorMessage,
    });
  });

  it('should return the error', () => {
    const error = { error: { error: { message: undefined } } };
    const result = errorHandlerService.handleError(error);
    expect(result).toEqual(error);
  });
});
