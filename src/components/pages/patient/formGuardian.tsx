import Card from "@/components/elementTag/cardText";
import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import Modal from "@/components/modal";
import { Ethnicity } from "@/enum/ethnicity.enum";
import { Gender } from "@/enum/gender.enum";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { HiOutlineCheck, HiOutlinePlus } from "react-icons/hi";
import * as yup from 'yup';
import FormAddress from "./formEditAddress";
import { Address, Option } from "./formPatient";

const validationAddress = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório'),
    streetAddress: yup.string().required('Campo obrigatório'),
    number: yup.string().required('Campo obrigatório'),
    complement: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    state: yup.string().required('Campo obrigatório'),
});

interface ModalGuardianProps{
    isOpen: boolean;
    onClose: () => void;
    onSave:(data:any)=>void;
}

export default function FormGuardian({isOpen, onClose, onSave} : ModalGuardianProps): JSX.Element {
    const { control: controlGuardian, register: registerGuardian, reset, watch: watchGuardian, handleSubmit: handleSubmitGuardian, formState: { errors: errorsGuardian }  } = useForm({
        resolver: yupResolver(validationAddress)
    });
    const { fields, append, update, remove } = useFieldArray({
        control: controlGuardian, 
        name: "addressGuardian",
    });
    const watch = watchGuardian('addressGuardian');
    const addressDisposer = useDisclosure();
    const editAddressDisposer = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState<Address>({} as Address);
    const [indexSelectedAddress, setIndexSelectedAddress] = useState<number>(0);

    function updateAddress(data: Address) {
        append(data);
    }

    useEffect(() => {
        reset({
            name: '',
            cep: '',
            streetAddress: '',
            number: '',
            complement: '',
            district: '',
            city: '',
            state: '',
        });
    }, [isOpen]);

    const updateHandleSubmit = async (data: any) => {
        onClose();
        onSave(data);
    };

    function convertAddressToOptions() {
        const addressOptions: Option[] = [];

        fields.map((item, index) => {
            const addressOption = {
                value: addressOptions.length + 1,
                label: watch[index].name
            };
            addressOptions.push(addressOption);
        });

        return addressOptions;
    }

    function updateEditAddress(data: Address) {
        update(indexSelectedAddress, data);
    }

    function deleteAddress() {
        remove(indexSelectedAddress);
    }

    return (
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-6xl"
        >
            <Modal.Header title="Cadastrar Guardião" icon={HiOutlinePlus} />
            <Modal.Body>
                <FormAddress isOpen={addressDisposer.isOpen} onClose={addressDisposer.close} address={selectedAddress} onSave={updateEditAddress} onDelete={deleteAddress}/>
                <form id='formGuardian' className="w-full gap-y-4 flex flex-wrap" onSubmit={handleSubmitGuardian(updateHandleSubmit)}>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="name"
                            type="text"
                            label="Nome"
                            placeholder="Insira o nome"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            autoComplete="new-password"
                            {...registerGuardian("name")}
                            error={errorsGuardian.name}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="lastName"
                            type="text"
                            label="Sobrenome"
                            placeholder="Insira o sobrenome"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            autoComplete="new-password"
                            {...registerGuardian("lastName")}
                            error={errorsGuardian.lastName}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="cpf"
                            type="text"
                            label="CPF"
                            placeholder="Insira o CPF"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("cpf")}
                            error={errorsGuardian.cpf}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="rg"
                            type="text"
                            label="RG"
                            placeholder="Insira o RG"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("rg")}
                            error={errorsGuardian.rg}
                        />
                    </div>

                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="birthDate"
                            type="date"
                            label="Data de nascimento"
                            placeholder="dd/mm/aaaa"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("birthDate")}
                            error={errorsGuardian.birthDate}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Select
                            label="Gênero"
                            name="gender"
                            placeHolder={"Selecione o gênero"}
                            valueDefault={-1}
                            data={
                                Object.keys(Gender).map((key) => ({
                                    id: parseInt(key),
                                    name: Gender[key as keyof typeof Gender],
                                }))
                            }
                            control={controlGuardian}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Select
                            label="Etnia"
                            name="ethnicity"
                            placeHolder={"Selecione a etnia"}
                            valueDefault={-1}
                            data={
                                Object.keys(Ethnicity).map((key) => ({
                                    id: parseInt(key),
                                    name: Ethnicity[key as keyof typeof Ethnicity],
                                }))
                            }
                            control={controlGuardian}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="email"
                            type="text"
                            label="E-mail"
                            placeholder="Insira o e-mail"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("email")}
                            error={errorsGuardian.email}
                        />
                    </div>

                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="phoneNumber"
                            type="text"
                            label="Telefone"
                            placeholder="Insira o telefone"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("phoneNumber")}
                            error={errorsGuardian.phoneNumber}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="profession"
                            type="text"
                            label="Profissão"
                            placeholder="Insira a profissão"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("profession")}
                            error={errorsGuardian.profession}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="nationality"
                            type="text"
                            label="Nacionalidade"
                            placeholder="Insira a nacionalidade"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("nationality")}
                            error={errorsGuardian.nationality}
                        />
                    </div>
                    <div className="w-1/2 md:w-1/4 px-2">
                        <Input 
                            id="naturalness"
                            type="text"
                            label="Naturalidade"
                            placeholder="Insira a naturalidade"
                            className="read-only:bg-gray-200 read-only:cursor-default"
                            {...registerGuardian("naturalness")}
                            error={errorsGuardian.naturalness}
                        />
                    </div>

                    <div className="w-full pt-6 px-2 border-t border-gray-300 dark:border-gray-500">
                        <div className="flex items-center justify-between">
                            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Endereços</label>
                            <button className="h-10 mb-1 space-x-2 flex items-center justify-center px-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
                                type="button"
                                onClick={() => {addressDisposer.open()}}
                            >
                                <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
                                <p className="md:block text-sm font-medium leading-tight text-white">Adicionar</p>
                            </button>
                        </div>
                        <Card.CardSelected>
                            {convertAddressToOptions().map((item, index) => (
                                <Card.TextSelected 
                                    key={index} 
                                    text={watch[index].name} 
                                    onClick={() => {
                                        const selectedAddress = watch[index] as Address;
                                        setIndexSelectedAddress(index);
                                        setSelectedAddress(selectedAddress);
                                        editAddressDisposer.open(); 
                                    }}
                                />
                            ))}
                        </Card.CardSelected>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer
                onClose={onClose}
                form="formGuardian"
            />
        </Modal.Root>
    )     
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();