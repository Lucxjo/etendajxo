import { Colour } from './colours.ts';
import { LogLevel } from './levels.ts';

export class Logger {
	private static _logLevel: LogLevel;

	constructor(level?: LogLevel) {
		if (level) {
			Logger._logLevel = level;
		} else if (Deno.env.get('LOG_LEVEL')) {
			Logger._logLevel = Number(Deno.env.get('LOG_LEVEL'));
		} else if (
			Deno.env.get('DENO_ENV') &&
			(Deno.env.get('DENO_ENV') === 'development' || 'dev')
		) {
			Logger._logLevel = LogLevel.Info;
		} else if (
			Deno.env.get('NODE_ENV') &&
			(Deno.env.get('NODE_ENV') === 'development' || 'dev')
		) {
			Logger._logLevel = LogLevel.Info;
		}
	}

	public setLogLevel(level: LogLevel) {
		Logger._logLevel = level;
	}

	public getLogLevel() {
		return Logger._logLevel;
	}

	error(args: any) {
		if (Logger._logLevel && Logger._logLevel <= LogLevel.Error) {
			console.error(`${Colour.FgRed}%s${Colour.Reset}`, args);
		}
	}

	info(args: any) {
		if (Logger._logLevel && Logger._logLevel <= LogLevel.Info) {
			console.info(`${Colour.FgWhite}%s${Colour.Reset}`, args);
		}
	}

	out(args: any) {
		console.info(`${Colour.FgWhite}%s${Colour.Reset}`, args);
	}

	warn(args: any) {
		if (Logger._logLevel && Logger._logLevel <= LogLevel.Warn) {
			console.warn(`${Colour.FgYellow}%s${Colour.Reset}`, args);
		}
	}
}
