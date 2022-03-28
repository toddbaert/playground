import {
  Context,
  FeatureProvider,
  FlagTypeError,
} from '@openfeature/openfeature-js';
import { init, LDClient } from 'launchdarkly-node-server-sdk';

/**
 * A comically primitive LaunchDarkly provider demo
 */
export class OpenFeatureLaunchDarklyProvider implements FeatureProvider {
  name = 'LaunchDarkly';
  private client: LDClient;
  private initialized: Promise<boolean>;

  constructor(sdkKey: string) {
    this.client = init(sdkKey);

    // we don't expose any init events at the moment (we might later) so for now, lets create a private
    // promise to await into before we evaluate any flags.
    this.initialized = new Promise((resolve) => {
      this.client.once('ready', () => {
        console.log(`${this.name}: initialization complete.`);
        resolve(true);
      });
    });
  }

  isEnabled(
    flagId: string,
    defaultValue: boolean,
    context?: Context
  ): Promise<boolean> {
    return this.getBooleanValue(flagId, defaultValue, context);
  }

  async getBooleanValue(
    flagId: string,
    defaultValue: boolean,
    context?: Context
  ): Promise<boolean> {
    const value = await this.evaluateFlag(flagId, defaultValue, context);
    if (typeof value === 'boolean') {
      return value;
    } else {
      throw new FlagTypeError(
        `Flag value ${flagId} had unexpected type ${typeof value}, expected boolean.`
      );
    }
  }

  async getStringValue(
    flagId: string,
    defaultValue: string,
    context?: Context
  ): Promise<string> {
    const value = await this.evaluateFlag(flagId, defaultValue, context);
    if (typeof value === 'string') {
      return value;
    } else {
      throw new FlagTypeError(
        `Flag value ${flagId} had unexpected type ${typeof value}, expected string.`
      );
    }
  }

  async getNumberValue(
    flagId: string,
    defaultValue: number,
    context?: Context
  ): Promise<number> {
    const value = await this.evaluateFlag(flagId, defaultValue, context);
    if (typeof value === 'number') {
      return value;
    } else {
      throw new FlagTypeError(
        `Flag value ${flagId} had unexpected type ${typeof value}, expected number.`
      );
    }
  }

  async getObjectValue<T extends object>(
    flagId: string,
    defaultValue: T,
    context?: Context
  ): Promise<T> {
    const value = await this.evaluateFlag(flagId, defaultValue, context);
    if (typeof value === 'string') {
      // we may want to allow the parsing to be customized.
      return JSON.parse(value);
    } else {
      throw new FlagTypeError(
        `Flag value ${flagId} had unexpected type ${typeof value}, expected object.`
      );
    }
  }

  // LD values can be boolean, number, or string: https://docs.launchdarkly.com/sdk/client-side/node-js#getting-started
  private async evaluateFlag(
    flagId: string,
    defaultValue: boolean | string | number | object,
    context?: Context
  ): Promise<boolean | number | string> {
    console.log(`${this.name}: evaluation flag`);

    // await the initialization before actually calling for a flag.
    await this.initialized;

    const userKey = context?.userId ?? 'anonymous';
    const flagValue = await this.client.variation(
      flagId,
      { key: userKey },
      defaultValue
    );

    console.log(`Flag '${flagId}' has a value of '${flagValue}'`);
    return flagValue;
  }
}
