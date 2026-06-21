import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Icon, Row } from "@/components";
import { storeInstitution, updateInstitution } from "@/features/institution/services";
import type { InstitutionType, InstitutionFormType } from "@/features/institution/types";
import type { PartialModalProps } from "@/types/layouts/modal";

interface PartialInstitutionProps extends PartialModalProps<InstitutionType> {}

const Partial = ({ modal, setModal, data, setData, setLoadData }: PartialInstitutionProps) => {
    const [loading, setLoading] = useState(false);
    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
    } = useForm<InstitutionFormType>();

    const onSubmit = (value: InstitutionFormType) => {
        const formData: InstitutionType = {
            id: value.id,
            name: value.name,
            surname: value.surname,
            tagline: value.tagline,
            npsn: value.npsn,
            nsm: value.nsm,
            address: value.address,
            phone: value.phone,
            email: value.email,
            website: value.website,
            head: value.head,
            image: value.image?.[0],
        };
        if (data.id === undefined) onStore(formData);
        else onUpdate(formData);
    };

    const onStore = async (formData: InstitutionType) => {
        setLoading(true);
        await storeInstitution(formData)
            .then((resp) => {
                if (resp.status === "success") {
                    toggle();
                    setLoadData(true);
                }
            })
            .finally(() => setLoading(false));
    };

    const onUpdate = async (formData: InstitutionType) => {
        setLoading(true);
        await updateInstitution(formData)
            .then((resp) => {
                if (resp.status === "success") {
                    toggle();
                    setLoadData(true);
                }
            })
            .finally(() => setLoading(false));
    };

    const handleReset = () => {
        setData({
            id: undefined,
            name: "",
            surname: "",
            tagline: "",
            npsn: "",
            nsm: "",
            address: "",
            phone: "",
            email: "",
            website: "",
            head: "",
            logo: "",
        });
        reset();
    };

    const toggle = () => {
        setModal(false);
        handleReset();
    };

    useEffect(() => {
        setValue("id", data.id);
        setValue("name", data.name);
        setValue("surname", data.surname);
        setValue("tagline", data.tagline);
        setValue("npsn", data.npsn);
        setValue("nsm", data.nsm);
        setValue("address", data.address);
        setValue("phone", data.phone);
        setValue("email", data.email);
        setValue("website", data.website);
        setValue("head", data.head);
    }, [data, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg">
            <ModalHeader
                toggle={toggle}
                close={
                    <button className="close" onClick={toggle}>
                        <Icon name="cross" />
                    </button>
                }
            >
                {data.id === undefined ? "TAMBAH" : "UBAH"}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-1">
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="name">
                                Nama Lembaga
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. Madrasah Aliyah Darul Hikmah Menganti"
                                    {...register("name", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.name && (
                                    <span className="invalid">{errors.name.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="surname">
                                Alias
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    placeholder="Ex. MA Darul Hikmah Menganti"
                                    {...register("surname", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.surname && (
                                    <span className="invalid">{errors.surname.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="form-label" htmlFor="tagline">
                                Tagline
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tagline"
                                    placeholder="Ex. Hemat Cermat dan Bersahaja"
                                    {...register("tagline", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.tagline && (
                                    <span className="invalid">{errors.tagline.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="npsn">
                                NPSN
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="npsn"
                                    placeholder="Ex. 12345678"
                                    {...register("npsn", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.npsn && (
                                    <span className="invalid">{errors.npsn.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="nsm">
                                NSM
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nsm"
                                    placeholder="Ex. 1234567890"
                                    {...register("nsm", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.nsm && (
                                    <span className="invalid">{errors.nsm.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="form-label" htmlFor="address">
                                Alamat
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    placeholder="Ex. Jl. Raya Jepara Bugel KM 07 Menganti Kedung Jepara"
                                    {...register("address", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.address && (
                                    <span className="invalid">{errors.address.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="phone">
                                Nomor Telepon
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Ex. (0291) 675 6789"
                                    {...register("phone", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.phone && (
                                    <span className="invalid">{errors.phone.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="email">
                                Alamat Email
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ex. ma@darul-hikmah.sch.id"
                                    {...register("email", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.email && (
                                    <span className="invalid">{errors.email.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="website">
                                Website
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="website"
                                    placeholder="Ex. https://ma.darul-hikmah.sch.id"
                                    {...register("website", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.website && (
                                    <span className="invalid">{errors.website.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="head">
                                Kepala Madrasah
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="head"
                                    placeholder="Ex. Faiz Noor, S.Pd."
                                    {...register("head", { required: "Kolom tidak boleh kosong" })}
                                />
                                {errors.head && (
                                    <span className="invalid">{errors.head.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="image">
                                Logo Madrasah
                            </label>
                            <div className="form-control-wrap">
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="form-control"
                                    {...register("image", {
                                        required: watch("id") ? false : "Berkas tidak boleh kosong.",
                                        validate: {
                                            fileSize: (files: FileList | undefined) => {
                                                if (files && files.length > 0) {
                                                    return (
                                                        files[0].size < 1_000_000 ||
                                                        "Ukuran file harus kurang dari 1 MB"
                                                    );
                                                }
                                                return true;
                                            },
                                            fileType: (files: FileList | undefined) => {
                                                if (files && files.length > 0) {
                                                    return (
                                                        ["image/jpeg", "image/png", "image/jpg"].includes(
                                                            files[0].type
                                                        ) || "Hanya file JPEG/JPG/PNG yang diperbolehkan"
                                                    );
                                                }
                                                return true;
                                            },
                                        },
                                    })}
                                />
                                {errors.image && (
                                    <span className="invalid">{errors.image.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <Button color="primary" type="submit" size="md">
                                {loading ? <Spinner size="sm" /> : "SIMPAN"}
                            </Button>
                        </div>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default Partial;
