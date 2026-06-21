export interface PartialModalProps<T> {
    modal: boolean;
    setModal: (modal: boolean) => void;
    data: T
    setData: (data: T) => void;
    setLoadData: (loadData: boolean) => void;
}