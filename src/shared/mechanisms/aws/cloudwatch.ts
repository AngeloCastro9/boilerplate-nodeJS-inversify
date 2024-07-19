import { CloudWatchLogs, InputLogEvent } from '@aws-sdk/client-cloudwatch-logs';

import { getEnv } from '@core/constants';

export class CloudwatchLogsAmazon {
  static getInstance () {
    const instance: CloudWatchLogs = new CloudWatchLogs({
      credentials: {
        accessKeyId: getEnv().aws.accessKey,
        secretAccessKey: getEnv().aws.secretKey,
      },
      region: getEnv().aws.cloudwatch.region,
    });

    return instance;
  }

  static async putLogEvents (group: string, stream: string, events: InputLogEvent[]) {
    const instance = CloudwatchLogsAmazon.getInstance();

    await instance.putLogEvents({
      logGroupName: group,
      logStreamName: stream,
      logEvents: events,
    });
  }
}