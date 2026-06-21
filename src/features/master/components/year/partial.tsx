import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { Icon, RSelect } from "@/components";
import { storeYear, updateYear } from "@/features/master/services";
import type { YearType } from "@/features/master/types";
import type { OptionsType } from "@/types";
import type { PartialModalProps } from "@/types/layouts/modal";

interface YearPartialProps extends PartialModalProps<YearType>{}

const Partial = ({ modal, setModal, data, setData, setLoadData }: YearPartialProps) => {
    const [loading, setLoading] = useState(false);
    const activeOptions: OptionsType[] = [
        { value: 1, label: "Ya" },
        { value: 2, label: "Tidak" },
    ]
    const {
        control,
        reset,
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<YearType>();

    const onSubmit = async (value: YearType) => {
        const formData: YearType = {
            id: value.id,
            name: value.name,
            description: value.description,
            active: value.active
        }
        if (data.id === undefined) await onStore(formData)
        else await onUpdate(formData);
    }
    const onStore = async (value: YearType) => {
        setLoading(true);
        await storeYear(value).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const onUpdate = async (value: YearType) => {
        setLoading(true)
        await updateYear(value).then(() => {
            toggle()
            setLoadData(true)
        }).finally(() => setLoading(false));
    }
    const handleReset = () => {
        setData({
            id: undefined,
            name: '',
            description: '',
            active: 0
        });
        reset();
    }
    const toggle = () => {
        setModal(false);
        handleReset();
    };
    useEffect(() => {
        setValue('id', data.id);
        setValue('name', data.name);
        setValue('description', data.description);
        setValue('active', data.active);
    }, [data, setValue]);

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross" />
                </button>
            }>
                {data.id === undefined ? 'TAMBAH' : 'UBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Tahun</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. 2024/2025"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Ex. Tahun Pelajaran 2024/2025"
                                {...register("description", { required: false })}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="active">Pilih Aktif</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                name="active"
                                rules={{ required: "Status tahun tidak boleh kosong" }}
                                render={({ field: {value, onChange} }) => (
                                    <React.Fragment>
                                        <RSelect
                                            options={activeOptions}
                                            value={activeOptions.find((item) => item.value === value)}
                                            onChange={(val) => onChange(val?.value)}
                                            placeholder="Pilih Aktif"
                                        />
                                        <input type="hidden" id="active" className="form-control" />
                                        {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </React.Fragment>
                                )
                                } />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            {loading ? <Spinner size="sm" /> : 'SIMPAN'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
