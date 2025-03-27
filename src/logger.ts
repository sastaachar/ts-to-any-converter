const loggers: Record<string, Logger> = {};

class Logger {

  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  log(...messages: string[]) {
    console.log(`[${this.name}]`, ...messages);
  }

  error(...messages: string[]) {
    console.error(`[${this.name}]`, ...messages);
  }

  warn(...messages: string[]) {
    console.warn(`[${this.name}]`, ...messages);
  }

  debug(...messages: string[]) {
    console.debug(`[${this.name}]`, ...messages);
  }

  info(...messages: string[]) {
    console.info(`[${this.name}]`, ...messages);
  }
}

export const getLogger = (name: string = "DefaultLogger") => {
  if (!loggers[name]) {
    loggers[name] = new Logger(name);
  }
  return loggers[name];
}
