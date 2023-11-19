import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { MdCheckCircleOutline } from "react-icons/md";

const rowsNumber = 5;

export interface TermPrivacy {
    id?: string;
    name: string;
    description: string;
    status: number;
    term_html: string;
    version: string;
    default: boolean;
}

export default function TermsPrivacy() {
    const router = useRouter();
    const [data, setData] = useState<TermPrivacy[]>([]);
    // const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const [isLoading, setIsLoading] = useState(false);

    const [params, setParams] = useState({
        page: currentPage,
        pageSize: rowsNumber,
        sortOrder: 'ASC',
        sortField: 'id',
        status: 0,
    });

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/term_commitment", {
                params: params
            });
            setData(RespAPI.data);
            setCurrentPage(RespAPI.page);
            setTotalElements(RespAPI.totalElement);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [currentPage]);
  return (
    <>
        <Header 
            title="Termos de Confiabilidade"
            subtitle="Consulte os termos de confiabilidade cadastrados na plataforma"
            textRight="Adicionar Termo"
            onClickRight={()=> router.push('/terms-privacy/add')}
            typeButtonRight="add"
        />
        <Table.Root tableHeight={String(rowsNumber)}>
            {data.map((item: TermPrivacy) => (
                <Table.Row 
                    key={item?.id}
                    onView={()=> router.push(`/terms-privacy/edit/${item?.id}`)}
                >
                    <Table.CellBody style={"w-1/5"}><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                    <Table.CellBody style={"w-1/5"}><p className="font-medium dark:text-white">{item.description}</p></Table.CellBody>
                    <Table.CellBody style={"w-1/5"}><p className="font-medium dark:text-white">{item.version}</p></Table.CellBody>
                    <Table.CellBody style={"w-1/5"}>
                        <button
                            type="button" 
                            className="h-full mr-4 px-3 py-2 border dark:border-gray-500 rounded-md cursor-pointer"
                            onClick={()=>console.log('click')}
                        >
                            <MdCheckCircleOutline 
                                className="w-5 h-5 text-teal-500 aria-hidden:hidden"
                                aria-hidden={!item.default}
                            />
                            <FiXCircle 
                                className="w-5 h-5 text-red-500 aria-hidden:hidden"
                                aria-hidden={item.default}
                            />
                        </button>
                    </Table.CellBody>
                </Table.Row>
            ))}
        </Table.Root> 

        <Pagination
            pageSize={rowsNumber}
            totalElements={totalElements}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();