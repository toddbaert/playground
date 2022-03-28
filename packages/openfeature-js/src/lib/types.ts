export type Context = {
  userId?: string;
};

export type FlagType = 'boolean' | 'string' | 'number' | 'json';

export interface Features {

  /**
  * Get a boolean flag value.
  *
  * NOTE: In some providers this has distinct behavior from getBooleanValue
  */
  isEnabled(flagId: string, defaultValue: boolean, context?: Context): Promise<boolean>;

  /**
  * Get a boolean flag value.
  */
  getBooleanValue(flagId: string, defaultValue: boolean, context?: Context): Promise<boolean>;

   /**
   * Get a string flag value.
   */
  getStringValue(flagId: string, defaultValue: string, context?: Context): Promise<string>;
 
   /**
   * Get a number flag value.
   */
  getNumberValue(flagId: string, defaultValue: number, context?: Context): Promise<number>;
 
   /**
   * Get a object (JSON) flag value.
   */
  getObjectValue<T extends object>(flagId: string, defaultValue: T, context?: Context): Promise<T>;
}

export interface FeatureProvider extends Features {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Client extends Features {}

export type FlagEvaluationRequest = {
  clientName: string;
  clientVersion?: string;
  flagId: string;
  context: Context;
};

export type FlagEvaluationResponse = {
  enabled: boolean;
};

export type FlagEvaluationVariationResponse = FlagEvaluationResponse & {
  stringValue?: string;
  boolValue?: boolean;
  numberValue?: number;
};
