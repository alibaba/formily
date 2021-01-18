enum CONSOLE_METHODS {
  DEBUG = 'debug',
  ERROR = 'error',
  INFO = 'info',
  LOG = 'log',
  WARN = 'warn',
  DIR = 'dir',
  DIRXML = 'dirxml',
  TABLE = 'table',
  TRACE = 'trace',
  GROUP = 'group',
  GROUPCOLLAPSED = 'groupCollapsed',
  GROUPEND = 'groupEnd',
  CLEAR = 'clear',
  COUNT = 'count',
  COUNTRESET = 'countReset',
  ASSERT = 'assert',
  PROFILE = 'profile',
  PROFILEEND = 'profileEnd',
  TIME = 'time',
  TIMELOG = 'timeLog',
  TIMEEND = 'timeEnd',
  TIMESTAMP = 'timeStamp',
  CONTEXT = 'context',
  MEMORY = 'memory',
  // custom name
  TIPS = 'tips',
}
type ILogData<C, T> = {
  content: C
  tips?: T
  keyword: string
}

class Log {
  private keyword = 'APP'
  constructor(keyword: string) {
    this.keyword = keyword
  }

  private getKeyWordStyle(name: CONSOLE_METHODS): string {
    return `[ ${this.keyword} ${name} ]: `
  }
  private callConsole<C, T>(name: CONSOLE_METHODS, content: C, tips?: T) {
    const logData: ILogData<C, T> = { content, keyword: this.keyword }
    const Console = console
    const keyword = this.getKeyWordStyle(name)
    Console[name] && Console[name](keyword, content)
    if (tips) {
      logData.tips = tips
      Console.info(this.getKeyWordStyle(CONSOLE_METHODS.TIPS), tips)
    }
    return logData
  }
  public log<C, T>(content: C) {
    return this.callConsole<C, T>(CONSOLE_METHODS.LOG, content)
  }
  public warn<C, T>(content: C, tips?: T) {
    return this.callConsole<C, T>(CONSOLE_METHODS.WARN, content, tips)
  }
  public error<C, T>(content: C, tips?: T) {
    return this.callConsole<C, T>(CONSOLE_METHODS.ERROR, content, tips)
  }
  public info<C, T>(content: C) {
    return this.callConsole<C, T>(CONSOLE_METHODS.INFO, content)
  }
}

export const log = new Log('Formily')
