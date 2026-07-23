type LogLevel = "INFO" | "WARN" | "ERROR";

class Logger {
  private formatLog(level: LogLevel, message: string, context?: any) {
    const timestamp = new Date().toISOString();
    const logObj = {
      timestamp,
      level,
      message,
      ...(context ? { context } : {}),
    };

    if (process.env.NODE_ENV === "development") {
      // Clean, human-readable logging in local development
      const colors = {
        INFO: "\x1b[36m", // Cyan
        WARN: "\x1b[33m", // Yellow
        ERROR: "\x1b[31m", // Red
      };
      const reset = "\x1b[0m";
      console.log(
        `${colors[level]}[${level}]${reset} ${timestamp} - ${message}`,
        context ? "\nContext:" : "",
        context ? JSON.stringify(context, null, 2) : ""
      );
    } else {
      // Structured JSON logging in production (CloudWatch, Vercel, Datadog ready)
      console.log(JSON.stringify(logObj));
    }
  }

  info(message: string, context?: any) {
    this.formatLog("INFO", message, context);
  }

  warn(message: string, context?: any) {
    this.formatLog("WARN", message, context);
  }

  error(message: string, error?: Error | unknown, context?: any) {
    const errObj = error instanceof Error 
      ? { name: error.name, message: error.message, stack: error.stack }
      : error;

    this.formatLog("ERROR", message, {
      ...(context || {}),
      error: errObj,
    });
  }
}

export const logger = new Logger();
