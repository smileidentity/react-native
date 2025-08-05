import {
  AuthenticationRequest,
  IdInfo,
  JobStatusRequest,
  JobType,
  SmileID,
} from '@smile_identity/react-native';

const currentPartner = '<YOUR PARTNER ID>';
export type SmileIDPollingFunction = keyof typeof SmileID;

export const getAuthInfo = async (
  jobType: JobType,
  userId: string,
  jobId: string,
  pollingFunctionName: SmileIDPollingFunction,
  idInfo?: IdInfo | null,
  ...pollingArgs: any[]
) => {
  const request = new AuthenticationRequest(jobType);
  request.jobId = jobId;
  request.userId = userId;
  if (idInfo) {
    request.country = idInfo.country;
    request.idType = idInfo.idType;
  }
  const response = await SmileID.authenticate(request);
  // TODO: Fix and test all native method calls to make sure they return objects
  // @ts-ignore - this is a known issue with the type definitions
  const parsedResponse = JSON.parse(response);
  if (parsedResponse) {
    try {
      const pollingFunction = SmileID[pollingFunctionName] as (
        ...args: any[]
      ) => Promise<any>;
      if (typeof pollingFunction !== 'function') {
        throw new Error(`${pollingFunctionName} is not a function in SmileID`);
      }
      const jobStatusRequest = new JobStatusRequest(
        userId,
        jobId,
        false,
        false,
        currentPartner,
        parsedResponse.timestamp,
        parsedResponse.signature
      );
      const pollingResult = await pollingFunction(
        jobStatusRequest,
        ...pollingArgs
      );
      console.log('Got polling results', pollingResult);
      return pollingResult;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
};

export const handleResponse = (
  jobType: JobType,
  pollingFunctionName?: SmileIDPollingFunction,
  response?: string,
  userId?: string,
  jobId?: string,
  callBack?: (response: any) => void
) => {
  if (response && userId && jobId && pollingFunctionName) {
    getAuthInfo(
      jobType,
      userId,
      jobId,
      pollingFunctionName,
      null,
      3000,
      5
    ).catch((error) => {
      console.log('Got response', error);
    });
    console.log('Got response', response);
    callBack?.(response);
  }
};

export const handleErrorResponse = (
  response?: string,
  callback?: (response: any) => void
) => {
  if (response) {
    callback?.(response);
  }
};
