import React, {useEffect, useState} from "react";
import Head from "@/components/layout/head";
import Content from "@/components/layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
    ReactDataTable
} from "@/components";
import {ButtonGroup, Spinner} from "reactstrap";
import {useNavigate} from "react-router-dom";
import { getInstitutions, deleteInstitution } from "@/features/institution/services";
import type { InstitutionType } from "@/features/institution/types";
import type {ColumnType} from "@/types";
import Partial from "./partial";

export const InstitutionList = () => {
    const [sm, updateSm] = useState<boolean>(false)
    const [loadData, setLoadData] = useState<boolean>(true)
    const [loading, setLoading] = useState<number|string|boolean|undefined>(false)
    const [modal, setModal] = useState<boolean>(false)
    const [institutions, setInstitutions] = useState<InstitutionType[]>([])
    const [institution, setInstitution] = useState<InstitutionType>({
        id: undefined,
        name: '',
        surname: '',
        tagline: '',
        npsn: '',
        nsm: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        head: '',
        logo: '',
    })
    const navigate = useNavigate()

    const Column: ColumnType<InstitutionType>[] = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Singkatan",
            selector: (row) => row.surname,
            sortable: false,
        },
        {
            name: "NSM",
            selector: (row) => row.nsm,
            sortable: false,
        },
        {
            name: "NPSN",
            selector: (row) => row.npsn,
            sortable: false,
        },
        {
            name: "Kepala Madrasah",
            selector: (row) => row.head,
            sortable: false,
        },
        {
            name: "Aksi",
            selector: (row) => row?.id,
            sortable: false,
            width: "150px",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button outline color="info" onClick={() => {
                        navigate(`/lembaga/${row.id}/detail`)
                    }}>
                        <Icon name="eye"/>
                    </Button>
                    <Button outline color="warning" onClick={() => {
                        setInstitution(row);
                        setModal(true);
                    }}>
                        <Icon name="pen"/>
                    </Button>
                    <Button outline color="danger" onClick={async () => {
                        setLoading(row?.id);
                        await deleteInstitution(row?.id)
                            .then(() => setLoadData(true))
                            .finally(() => setLoading(false));
                    }}>
                        {loading === row.id ? <Spinner size="sm"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    useEffect(() => {
        if(loadData) getInstitutions<InstitutionType>({type: 'datatable'})
            .then((resp) => setInstitutions(resp))
            .finally(() => setLoadData(false));
    }, [loadData]);

    return (
        <React.Fragment>
            <Head title="Data Lembaga"/>
            <Content>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Data Lembaga</BlockTitle>
                                <p>
                                    Textual form controls—like <code className="code-tag">&lt;input&gt;</code>s,{" "}
                                    <code className="code-tag">&lt;select&gt;</code>s, and{" "}
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                        onClick={() => updateSm(!sm)}
                                    >
                                        <Icon name="menu-alt-r"/>
                                    </Button>
                                    <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                        <ul className="nk-block-tools g-3">
                                            <li>
                                                <Button color="primary" size="sm" outline className="btn-white"
                                                        onClick={() => setModal(true)}>
                                                    <Icon name="plus"/>
                                                    <span>TAMBAH</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <PreviewCard>
                        <ReactDataTable data={institutions} columns={Column} pagination progressPending={loadData}/>
                    </PreviewCard>
                    <Partial modal={modal} setModal={setModal} data={institution} setData={setInstitution} setLoadData={setLoadData}/>
                </Block>
            </Content>
        </React.Fragment>
    )
}