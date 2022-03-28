import { Context, FeatureProvider, FlagEvaluationResponse } from './types';

class NoopFeatureProvider implements FeatureProvider {
  isEnabled(id: string, defaultValue: boolean, context?: Context): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getBooleanValue(flagId: string, defaultValue: boolean, context?: Context): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getStringValue(flagId: string, defaultValue: string, context?: Context): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getNumberValue(flagId: string, defaultValue: number, context?: Context): Promise<number> {
    throw new Error('Method not implemented.');
  }
  getObjectValue<T extends object>(flagId: string, defaultValue: T, context?: Context): Promise<T> {
    throw new Error('Method not implemented.');
  }
  name = 'No-op Provider';

  async evaluateFlag(): Promise<FlagEvaluationResponse> {
    return { enabled: false };
  }
}

export const NOOP_FEATURE_PROVIDER = new NoopFeatureProvider();
