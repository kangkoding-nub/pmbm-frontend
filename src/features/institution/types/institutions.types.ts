/**
 * Data shape returned by the API (and used for display).
 * `image` here is a `File` when sending to the API, or a URL string when received.
 * `logo` is the stored URL returned by the backend.
 */
export type InstitutionType = {
    id: number | undefined;
    name: string;
    surname: string;
    tagline: string;
    npsn: string;
    nsm: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    head: string;
    logo?: string;
    image?: File;
    createdBy?: number;
    updatedBy?: number;
};

/**
 * Form data shape used with react-hook-form.
 * `image` is a `FileList` because that's what <input type="file"> produces.
 * Before sending to the API, extract `image[0]` to get the actual `File`.
 */
export type InstitutionFormType = Omit<InstitutionType, 'image'> & {
    image?: FileList;
};
