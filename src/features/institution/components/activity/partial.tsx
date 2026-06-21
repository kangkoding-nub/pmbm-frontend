import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Icon } from "@/components";
import { storeActivity, updateActivity } from "@/features/institution/services";
import type { InstitutionActivityType } from "@/features/institution/types";
import type { PartialModalProps } from "@/types/layouts/modal";
import { useYearContext } from "@/hooks";

interface PartialActivityProps extends PartialModalProps<InstitutionActivityType> {
    institutionId: number;
}

const Partial = ({ modal, setModal, data, setData, setLoadData, institutionId }: PartialActivityProps) => {
    const year = useYearContext();
    const [loading, setLoading] = useState(false);
    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<InstitutionActivityType>();

    const onSubmit = (value: InstitutionActivityType) => {
        const formData: InstitutionActivityType = {
            id: value.id,
            yearId: year?.id,
            institutionId: institutionId,
            capacity: value.capacity,
            file: value.file?.[0] as unknown as FileList,
        };
        if (value.id === undefined) onStore(formData);
        else onUpdate(formData);
    };

    const onStore = async (formData: InstitutionActivityType) => {
        setLoading(true);
        await storeActivity(formData)
            .then((resp) => {
                if (resp.status === "success") {
                    toggle();
                    setLoadData(true);
                }
            })
            .finally(() => setLoading(false));
    };

    const onUpdate = async (formData: InstitutionActivityType) => {
        setLoading(true);
        await updateActivity(formData)
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
            yearId: undefined,
            institutionId: undefined,
            capacity: "",
        });
        reset();
    };

    const toggle = () => {
        setModal(false);
        handleReset();
    };

    useEffect(() => {
        setValue("id", data.id);
        setValue("capacity", data.capacity);
    }, [data, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader
                toggle={toggle}
                close={
                    <button className="close" onClick={toggle}>
                        <Icon name="cross" />
                    </button>
                }
            >
                {getValues("id") === undefined ? "TAMBAH" : "UBAH"}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="capacity">
                            Kapasitas
                        </label>
                        <div className="form-control-wrap">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="capacity"
                                    placeholder="Ex. 180"
                                    {...register("capacity", { required: true })}
                                />
                                <div className="input-group-append">
                                    <span className="input-group-text">Siswa</span>
                                </div>
                            </div>
                            {errors.capacity && (
                                <span className="invalid">Kolom tidak boleh kosong</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="file">
                            File Brosur
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="file"
                                id="file"
                                accept="application/pdf"
                                className="form-control"
                                {...register("file", {
                                    required: data.id === undefined ? "Berkas tidak boleh kosong" : false,
                                    validate: {
                                        isPdf: (files) => {
                                            if (!files || (files as FileList).length === 0) return true;
                                            return (
                                                (files as FileList)[0]?.type === "application/pdf" ||
                                                "Hanya file PDF yang diperbolehkan"
                                            );
                                        },
                                        maxSize: (files) => {
                                            if (!files || (files as FileList).length === 0) return true;
                                            const maxSize = 5 * 1024 * 1024;
                                            return (
                                                (files as FileList)[0]?.size <= maxSize ||
                                                "Ukuran file harus kurang dari 5MB"
                                            );
                                        },
                                    },
                                })}
                            />
                            {errors.file && (
                                <span className="invalid">{String(errors.file.message)}</span>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            {loading ? <Spinner size="sm" /> : "SIMPAN"}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default Partial;
