import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import schema, { ConfigSchema } from './config.schema';
import { z } from 'zod';
import logger from '../utils/log/logger';

dotenv.config();

class Config {
  private static instance: Config;
  public config: ConfigSchema; // Use the inferred type

  private constructor() {
    logger.info('Loading and validating config for the first time...');
    this.config = this.loadAndValidateConfig();
    Config.instance = this;
    logger.info('Config loaded and validated', {
      NODE_ENV: this.config.NODE_ENV,
      PORT: this.config.PORT,
    });
    logger.info('Config keys: ', Object.keys(this.config));
  }

  private loadAndValidateConfig(): ConfigSchema {
    // Load config file
    dotenv.config();
    const configFile = path.join(__dirname, 'config.json');
    if (!fs.existsSync(configFile)) {
      throw new Error(`Config file not found: ${configFile}`);
    }
    let config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    const finalConfig: any = {};
    for (const key of Object.keys(schema.shape)) {
      if (process.env.hasOwnProperty(key)) {
        finalConfig[key] = process.env[key]; // Prioritize environment variables
      } else if (config.hasOwnProperty(key)) {
        finalConfig[key] = config[key]; // Fallback to config file value
      }
    }

    try {
      const validatedConfig = schema.parse(finalConfig);
      return validatedConfig; // Return the validated config
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors
          .map((err) => `${err.path[0]}: ${err.message}`)
          .join(', ');
        throw new Error(`Config validation error: ${validationErrors}`);
      }
      throw error;
    }
  }

  static getInstance() {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config.getInstance().config;
