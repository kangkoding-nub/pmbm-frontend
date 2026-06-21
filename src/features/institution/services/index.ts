// Re-export only unique named exports from institution sub-services.
// Both institution.services and account export a 'get' alias,
// so we selectively re-export to avoid ambiguity.
export * from './activity.services';
export {
    getInstitutions,
    showInstitution,
    storeInstitution,
    updateInstitution,
    deleteInstitution,
    /** @deprecated */ get,
    /** @deprecated */ show,
} from './institution.services';
export {
    getAccounts,
    storeAccount,
    updateAccount,
    deleteAccount,
} from './account';
export {
    getPeriods,
    storePeriod,
    updatePeriod,
    deletePeriod,
} from './period';
