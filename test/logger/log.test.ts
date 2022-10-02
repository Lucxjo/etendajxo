import { Logger } from "../../src/logger/log.ts";
import { assertEquals } from "https://deno.land/std@0.158.0/testing/asserts.ts";
import { LogLevel } from "../../src/logger/levels.ts";

Deno.test("Test output", () => {
    const logger = new Logger();
    const logLevels = [LogLevel.Info, LogLevel.Warn, LogLevel.Error];
    assertEquals(logger, new Logger());
    if (Deno.env.get("DENO_ENV") === "development" || "dev") {
        assertEquals(logger.getLogLevel(), LogLevel.Info);
    } else {
        assertEquals(logger.getLogLevel(), LogLevel.Error);
    }
    logger.setLogLevel(LogLevel.Info);

    for (const level of logLevels) {
        logger.setLogLevel(level);
        assertEquals(logger.getLogLevel(), level);
        logger.out(level)
        logger.info(`Hello Info, ${level}`);
        logger.warn(`Hello Warn, ${level}`);
        logger.error(`Hello Error, ${level}`);
    }
})