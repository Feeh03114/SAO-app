import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import { PatientRecord } from "@/pages/schedule/edit/[idSchedule]";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { HiOutlineInboxIn } from "react-icons/hi";
import * as yup from 'yup';

const mock = { 
    id: 1, 
    name: "Nome Exemplo",
    email: "exemple@email.com",
    phone: "(11) 99999-9999",
    date: "2021-10-10",
    time: "10:00",
    discipline: "Geral",
    service: "Limpeza",
    price: "R$ 100,00",
}

const validationFullModal = yup.object().shape({
    id: yup.string().optional(),
    complaint_text: yup.string().required('Campo obrigatório'),
    treatment_id: yup.string().required('Campo obrigatório'),
    service_id: yup.string().required('Campo obrigatório'),
    consultationReport: yup.string().required('Campo obrigatório'),
});

const treatment_idMock = [
    'Exemplo 1',
    'Exemplo 2',
    'Exemplo 3',
    'Exemplo 4',
    'Exemplo 5',
    'Exemplo 6',
    'Exemplo 7',
]

interface FormProfileProps {
    edit?: PatientRecord;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormPatientRecord({edit, isPermissionWrite=true, onSave}:FormProfileProps): JSX.Element {
    const { reset, control, register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });

    const loadingPages = async () =>{
        try {
            if(edit){
                reset({
                    ...edit,
                })
            }
            else
                reset({
                    name: '',
                    typeUser: -1,
                    default: false,
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingPages();
    }, [edit]);

    const onSavePatientSchedule = async (data:any) => {
        console.log(data);
        onSave(data);
        // delete data.guardian;

        // const patient = {
        //     stats: "Ativo",
        //     people: data,
        // } as PatientRecord;

        // console.log(patient);
        // onSave(patient);
    }
    
    return (
        <div className="gap-y-3 md:gap-y-6 md:mx-10 md:mb-10 px-3 md:pt-6 pb-6 flex items-center justify-centers flex-row flex-wrap md:border border-gray-200 dark:border-gray-500 dark:bg-slate-800 shadow-sm rounded-lg">
            <div className="gap-y-3 md:gap-y-6 flex items-center justify-centers flex-row flex-wrap">
                <div className="w-full md:w-1/4 mt-6 md:mt-0 flex flex-row justify-center items-center">
                    <div className="flex mx-2 items-center justify-center rounded-full bg-teal-200 dark:bg-teal-400 w-16 h-16">
                        <BsPerson className="w-8 h-8"/>
                    </div>
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="discipline"
                        type="text"
                        label="Disciplina"
                        placeholder={mock.discipline}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="email"
                        type="text"
                        label="E-mail"
                        placeholder={mock.phone}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="phone"
                        type="text"
                        label="Telefone"
                        placeholder={mock.phone}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="date"
                        type="text"
                        label="Data de agenda"
                        placeholder={mock.date}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="time"
                        type="text"
                        label="Horário"
                        placeholder={mock.time}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="service"
                        type="text"
                        label="Serviço"
                        placeholder={mock.service}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="price"
                        type="text"
                        label="Serviço"
                        placeholder={mock.price}
                        className="bg-gray-200 cursor-default"
                        readOnly={true}
                    />
                </div>

                <form id='formPatientRecord' onSubmit={handleSubmit(onSavePatientSchedule)} className="gap-y-3 md:gap-y-6 flex items-center justify-centers flex-row flex-wrap">
                    <div className="w-full px-2">
                        <Input 
                            id="name"
                            type="text"
                            label="Queixa"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            autoComplete="new-password"
                            {...register("complaint_text")}
                            error={errors.complaint_text}
                        />
                    </div>

                    <div className="w-full mt-4">
                        <div className="w-full mx-4 flex flex-col md:flex-row md:items-end justify-between">
                            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Relatório da consulta</label>
                            <div className="mr-1 mb-2 flex flex-row items-center justify-end">
                                <div className="w-full pl-0 px-3 md:px-2">
                                    <Select
                                        name="treatment_id"
                                        placeHolder={"Selecione o treatment_id"}
                                        valueDefault={-1}
                                        valueTypeName={true}
                                        data={
                                            treatment_idMock.map((item, index) => ({
                                                id: index,
                                                name: item,
                                            }))
                                        }
                                        control={control}
                                        error={errors.treatment_id}
                                    />
                                </div>
                                <div className="w-full mr-4 px-2">
                                    <Select
                                        name="service_id"
                                        placeHolder={"Selecione o serviço odontológico"}
                                        valueDefault={-1}
                                        valueTypeName={true}
                                        data={
                                            treatment_idMock.map((item, index) => ({
                                                id: index,
                                                name: item,
                                            }))
                                        }
                                        control={control}
                                        error={errors.service_id}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <textarea 
                                id="observation"
                                className="w-full h-40 text-sm rounded-lg px-4 py-2 dark:text-white shadow border border-gray-300 dark:border-gray-500 bg-white dark:bg-slate-700 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                                placeholder="Descreva o que aconteceu com o paciente"
                                disabled={true}
                                // {...register("consultationReport")}
                            />
                            {/* {!!errors.consultationReport && (
                                <p className="text-red-500 text-sm">{errors.consultationReport.message?.toString()}</p>
                            )} */}
                        </div>
                    </div>

                    <div className="w-full mb-3 md:mb-6 px-3 flex items-center justify-centers flex-col flex-wrap">
                        <div className="w-full pl-4 inline-flex items-center justify-start">
                            <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-white truncate">Documentos</p>
                        </div>
                        <div className="w-full h-40 px-4 flex items-center justify-center shadow-sm border rounded-lg border-gray-300 dark:border-gray-500 bg-white dark:bg-slate-700 focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none">
                            <HiOutlineInboxIn className="w-28 h-28 text-slate-300 dark:text-slate-500"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();