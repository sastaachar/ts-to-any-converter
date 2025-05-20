
export enum LogLevel {
  Silent = -1,
  Error = 0,
  Warn = 1,
  Info = 2,
  Debug = 3,
}

export class Logger {
  private logLevel: LogLevel;
  private name: string;
  constructor(name: string) {
    this.name = name;
  }

  setLogLevel(logLevel: LogLevel) {
    this.logLevel = logLevel;
  }

  getMessageToLog(messages: string[], logLevel: LogLevel) {
      return [`[${this.name}-${LogLevel[logLevel]}]`, ...messages];
  }

  canLog(logLevel: LogLevel) {
    return logLevel <= this.logLevel;
  }

  error(...messages: string[]) {
    if (!this.canLog(LogLevel.Error)) {
      return;
    }
    console.error(...this.getMessageToLog(messages, LogLevel.Error));
  }

  warn(...messages: string[]) {
    if (!this.canLog(LogLevel.Warn)) {
      return;
    }
    console.warn(...this.getMessageToLog(messages, LogLevel.Warn));
  }

  info(...messages: string[]) {
    if (!this.canLog(LogLevel.Info)) {
      return;
    }
    console.log(...messages);
  }

  infoTag(...messages: string[]) {
    if (!this.canLog(LogLevel.Info)) {
      return;
    }
    console.log(...this.getMessageToLog(messages, LogLevel.Info)); 
  }

  group(...data: string[]) {
    console.group(...data);
  }

  groupTag(...data: string[]) {
    if (!this.canLog(LogLevel.Info)) {
      return;
    }
    console.group(...this.getMessageToLog(data, LogLevel.Info));
  }

  debug(...messages: string[]) {
    if (!this.canLog(LogLevel.Debug)) {
      return;
    }
    console.debug(...this.getMessageToLog(messages, LogLevel.Debug));
  }

  debugGroup(...messages: string[]) {
    if (!this.canLog(LogLevel.Debug)) {
      return;
    }
    this.group(...this.getMessageToLog(messages, LogLevel.Debug));
  }

  groupEnd() {
    console.groupEnd();
  }

  debugGroupEnd() {
    if (!this.canLog(LogLevel.Debug)) {
      return;
    }
    this.groupEnd();
  }
}

export const logger = new Logger('T2A');