import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { Icon } from "@/components";
import { storeRoom, updateRoom } from "@/features/master/services";
import type { RoomType } from "@/features/master/types";
import type { PartialModalProps } from "@/types/layouts/modal";

interface PartialRoomProps extends PartialModalProps<RoomType> {}

const Partial = ({ modal, setModal, data, setData, setLoadData }: PartialRoomProps) => {
    const [loading, setLoading] = useState(false);
    const {
        reset,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<RoomType>();

    const onSubmit = async (value: RoomType) => {
        const formData: RoomType = {
            id: value.id,
            name: value.name,
            capacity: Number(value.capacity),
        };
        if (data.id === undefined) await onStore(formData);
        else await onUpdate(formData);
    };

    const onStore = async (value: RoomType) => {
        setLoading(true);
        await storeRoom(value)
            .then(() => {
                toggle();
                setLoadData(true);
            })
            .finally(() => setLoading(false));
    };

    const onUpdate = async (value: RoomType) => {
        setLoading(true);
        await updateRoom(value)
            .then(() => {
                toggle();
                setLoadData(true);
            })
            .finally(() => setLoading(false));
    };

    const handleReset = () => {
        setData({
            id: undefined,
            name: '',
            capacity: undefined,
        });
        reset();
    };

    const toggle = () => {
        setModal(false);
        handleReset();
    };

    useEffect(() => {
        setValue('id', data.id);
        setValue('name', data.name);
        setValue('capacity', data.capacity);
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
                {data.id === undefined ? 'TAMBAH' : 'UBAH'} KAMAR
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Nama Kamar
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Kamar A1, Kamar Melati, dll"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="capacity">
                            Kapasitas
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                placeholder="Ex. 10"
                                min="1"
                                {...register("capacity", {
                                    required: "Kapasitas tidak boleh kosong",
                                    min: { value: 1, message: "Kapasitas minimal 1" },
                                })}
                            />
                            {errors.capacity && <span className="invalid">{errors.capacity.message}</span>}
                        </div>
                        <div className="form-note">Jumlah maksimal santri yang dapat ditampung di kamar ini</div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            {loading ? <Spinner size="sm" /> : 'SIMPAN'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default Partial;
