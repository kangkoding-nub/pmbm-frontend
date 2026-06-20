import React, { useState } from "react";
import { Block, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Button, Icon, PreviewCard } from "@/components";
import Head from "@/components/layout/head"
import Content from "@/components/layout/content"
import { useAuthContext } from "@/hooks/useAuthContext";
import {useYearContext} from "@/hooks/useYearContext";
import PeriodComponent from "@/features/institution/components/period";

const InstitutionPeriod = () => {
    const year = useYearContext()
    const { user } = useAuthContext()
    const [modal, setModal] = useState<boolean>(false)
    return (
        <React.Fragment>
            <Head title="Periode Pendaftaran" />
            <Content page="component">
                <Block>
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">Data Program</BlockTitle>
                                <p>Data Periode Pendaftaran Tahun Ajaran {year?.name}</p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <div className="toggle-expand-content" style={{ display: "none" }}>
                                        <ul className="nk-block-tools g-3">
                                            <li>
                                                <Button color="primary" size="sm" outline className="btn-white"
                                                    onClick={() => setModal(true)}>
                                                    <Icon name="plus" />
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
                        <PeriodComponent institutionId={user?.institutionId} modal={modal} setModal={setModal}/>
                    </PreviewCard>
                </Block>
            </Content>
        </React.Fragment>
    )
};

export default InstitutionPeriod