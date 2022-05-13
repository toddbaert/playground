import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@openfeature/openfeature-js';
import { OPENFEATURE_CLIENT, REQUEST_DATA } from '../constants';
import { RequestData } from '../types';

@Injectable()
export class MessageService {
  constructor(
    @Inject(OPENFEATURE_CLIENT) private client: Client,
    @Inject(REQUEST_DATA) private context: RequestData
  ) {}

  async getMessage() {
    const message = (await this.client.getBooleanValue(
      'new-welcome-message',
      false
    ))
      ? 'Welcome to Fib3r: Fibonacci as a Service!'
      : 'Welcome to FaaS: Fibonacci as a Service!';
    return { message };
  }
}
