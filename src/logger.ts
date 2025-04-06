const loggers: Record<string, Logger> = {};

class Logger {

  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  log(...messages: unknown[]) {
    console.log('hi')
    console.log(`[${this.name}]`, ...messages);
  }

  error(...messages: unknown[]) {
    console.error(`[${this.name}]`, ...messages);
  }

  warn(...messages: unknown[]) {
    console.warn(`[${this.name}]`, ...messages);
  }

  debug(...messages: unknown[]) {
    console.debug(`[${this.name}]`, ...messages);
  }

  info(...messages: unknown[]) {
    console.info(`[${this.name}]`, ...messages);
  }
}

export const getLogger = (name: string = "DefaultLogger") => {
  if (!loggers[name]) {
    loggers[name] = new Logger(name);
  }
  return loggers[name];
}
