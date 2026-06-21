import React, { useEffect, useState } from "react";
import Head from "@/components/layout/head";
import Content from "@/components/layout/content";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button, Col,
    Icon,
    PreviewCard,
    Row
} from "@/components";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { useYearContext } from "@/hooks/useYearContext";
import VerificationForm, {
    AchievementForm,
    AddressForm, FileForm, OriginForm,
    ParentForm,
    PersonalForm,
    ProgramForm,
    type StudentAddInterface,
    StudentUserForm
} from "@/features/student/pages/partials/form";
import { useSearchParams, useParams } from "react-router-dom";
import { get as getPersonal } from "@/features/student/services/personal";
import { get as getParent } from "@/features/student/services/parent";
import { get as getAddress } from "@/features/student/services/address";
import { get as getProgram } from "@/features/student/services/program";
import { get as getOrigin } from "@/features/student/services/origin";
import { get as getFile } from "@/features/student/services/file";
import { get as getVerification } from "@/features/student/services/verification";
import { show as showUser } from "@/features/user/services/user";
import { get as getAchievement } from "@/features/student/services/achievement";

const StudentAdd = () => {
    const year = useYearContext();
    const { id: paramId } = useParams();
    const [searchParams] = useSearchParams();
    const [sm, updateSm] = useState(false)
    const [activeIconTab, setActiveIconTab] = useState("1");
    const [formData, setFormData] = useState<StudentAddInterface>()
    const id = paramId || searchParams.get('id');

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const user = await showUser(Number(id));
                    const personal = await getPersonal({ userId: Number(id) }).then((resp) => resp[0]);
                    const parent = await getParent({ userId: Number(id) }).then((resp) => resp[0]);
                    const address = await getAddress({ userId: Number(id) }).then((resp) => resp[0]);
                    const program = await getProgram({ userId: Number(id) }).then((resp) => resp[0]);
                    const origin = await getOrigin({ userId: Number(id) }).then((resp) => resp[0]);
                    const file = await getFile({ userId: Number(id) }).then((resp) => resp[0]);
                    const verification = await getVerification({ userId: Number(id) }).then((resp) => resp[0]);
                    const achievements = await getAchievement({ userId: Number(id) });

                    setFormData({
                        user,
                        personal: personal as any,
                        parent: parent as any,
                        address: address as any,
                        program,
                        origin,
                        file: file as any,
                        verification,
                        achievements
                    });
                } catch (error) {
                    console.error("Failed to fetch student data", error);
                }
            };
            fetchData();
        }
    }, [id]);

    return (
        <React.Fragment>
            <Head title={id ? "Ubah Pendaftar" : "Tambah Pendaftar"} />
            <Content>
                <Block size="lg">
                    <BlockHead>
                        <BlockBetween>
                            <BlockHeadContent>
                                <BlockTitle tag="h5">{id ? "Ubah Pendaftar" : "Tambah Pendaftar"}</BlockTitle>
                                <p>
                                    {id ? "Ubah Data Pendaftar" : "Tambah Pendaftar"} Tahun Pelajaran {year?.name}
                                </p>
                            </BlockHeadContent>
                            <BlockHeadContent>
                                <div className="toggle-wrap nk-block-tools-toggle">
                                    <Button
                                        className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                        onClick={() => updateSm(!sm)}
                                    >
                                        <Icon name="menu-alt-r" />
                                    </Button>
                                </div>
                            </BlockHeadContent>
                        </BlockBetween>
                    </BlockHead>
                    <Row className="gy-0">
                        <Col md={12}>
                            <PreviewCard>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "1" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="user-alt" /> <span>Buat Akun</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "2" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="user" /> <span>Informasi Pribadi</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "3" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="users" /> <span>Informasi Orangtua</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "4" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="map-pin" /> <span>Tempat Tinggal</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "5" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="list" /> <span>Program Pilihan</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "6" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="building" /> <span>Sekolah Asal</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "7" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="medal" /> <span>Data Prestasi</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "8" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="file" /> <span>Berkas</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            tag="a"
                                            href="#tab"
                                            className={classnames({ active: activeIconTab === "9" })}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="check" /> <span>Verifikasi</span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeIconTab}>
                                    <TabPane tabId="1">
                                        <StudentUserForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <PersonalForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <ParentForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <AddressForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <ProgramForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="6">
                                        <OriginForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="7">
                                        <AchievementForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="8">
                                        <FileForm setActiveIconTab={setActiveIconTab} setFormData={setFormData} formData={formData} />
                                    </TabPane>
                                    <TabPane tabId="9">
                                        <VerificationForm formData={formData} setActiveIconTab={setActiveIconTab} setFormData={setFormData} />
                                    </TabPane>
                                </TabContent>
                            </PreviewCard>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </React.Fragment>
    )
}

export default StudentAdd;