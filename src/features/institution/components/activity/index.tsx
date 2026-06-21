import React, { useEffect, useState } from "react";
import { Button, Icon, ReactDataTable } from "@/components";
import type { ColumnType } from "@/types";
import type { InstitutionActivityType } from "@/features/institution/types";
import { Link } from "react-router-dom";
import { ButtonGroup, Spinner } from "reactstrap";
import { deleteActivity, getActivities } from "@/features/institution/services";

interface ActivitiesComponentProps {
    institutionId?: number;
    modal: boolean;
    setModal: (modal: boolean) => void;
    setData?: (data: InstitutionActivityType) => void;
}

const ActivityComponent = ({ institutionId, setData, setModal }: ActivitiesComponentProps) => {
    const [loading, setLoading] = useState<boolean | number | undefined>(false);
    const [loadData, setLoadData] = useState<boolean>(true);
    const [activities, setActivities] = useState<InstitutionActivityType[]>([]);

    const Column: ColumnType<InstitutionActivityType>[] = [
        {
            name: "Tahun Pelajaran",
            selector: (row) => row.year?.name ?? "",
            sortable: false,
        },
        {
            name: "Kapasitas",
            selector: (row) => row.capacity + " Siswa",
            sortable: false,
        },
        {
            name: "Brosur",
            selector: (row) => row.brochure ?? "",
            sortable: false,
            cell: (row) => (
                <Link to={String(row.brochure)}>
                    <Button outline color="info" size="sm">
                        <Icon name="eye" />
                    </Button>
                </Link>
            ),
        },
        {
            name: "Aksi",
            selector: (row) => row?.id ?? 0,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button
                        outline
                        color="warning"
                        onClick={() => {
                            setData?.(row);
                            setModal(true);
                        }}
                    >
                        <Icon name="pen" />
                    </Button>
                    <Button
                        outline
                        color="danger"
                        onClick={async () => {
                            setLoading(row?.id);
                            await deleteActivity(row?.id)
                                .then(() => setLoadData(true))
                                .finally(() => setLoading(false));
                        }}
                    >
                        {loading === row.id ? <Spinner size="sm" /> : <Icon name="trash" />}
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    useEffect(() => {
        getActivities<InstitutionActivityType>({ type: "datatable", institutionId: String(institutionId ?? "") }).then((resp) => {
            if (resp) setActivities(resp);
        }).finally(() => setLoadData(false));
    }, [institutionId, loadData]);

    return (
        <React.Fragment>
            <ReactDataTable data={activities} columns={Column} pagination progressPending={loadData} />
        </React.Fragment>
    );
};

export default ActivityComponent;
