import { config } from "../lib/config/config";

let statusLogger = null;

if ('StatusLogger' in config)
	statusLogger = new config.StatusLogger();

export function statusLog(rooms, peers)
{
	if (statusLogger)
	{
		statusLogger.log({
			rooms : rooms,
			peers : peers
		});
	}
}