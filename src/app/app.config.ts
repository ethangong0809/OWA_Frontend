const baseUrl = 'http://localhost:9080/owa/';

export const APP_CONFIG = {

    saveGeneralRequest: baseUrl + 'saveGeneralRequest',
    saveMediaRequest:baseUrl + 'saveMediaRequest',
    saveElectedOfficialRequest:baseUrl +'saveElectedOfficialRequest',
    saveReportProblemRequest:baseUrl +'saveReportProblemRequest',
    getStatus:baseUrl + 'getStatus',
    saveReportProblemRequestWithFiles:baseUrl + 'saveReportProblemRequestWithFiles'
}