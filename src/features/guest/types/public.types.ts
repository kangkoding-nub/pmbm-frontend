export interface GetPublicYearParams {
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface GetPublicLandingParams {
    institutionId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface GetPublicRulesParams {
    institutionId?: number;
    yearId?: number;
    [key: string]: string | number | boolean | null | undefined;
}

export interface GetPublicScheduleParams {
    institutionId?: number;
    yearId?: number;
    [key: string]: string | number | boolean | null | undefined;
}