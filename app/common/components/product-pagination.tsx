import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "./ui/pagination";
import { useSearchParams } from "react-router";

type ProductPaginationProps = {
    totalPages: number;
}

export function ProductPagination({ totalPages, }: ProductPaginationProps) {

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const searchQuery = searchParams.get("query");

    const onClick = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams, {
            preventScrollReset: true,
        });
    }

    return <div>
        <Pagination className={"mt-8"}>
            <PaginationContent>
                {
                    page <= 1 ? null : <>
                        <PaginationItem>
                            <PaginationPrevious
                                to={`?page=${page - 1}&query=${searchQuery}`}
                                onClick={(event) => {
                                    event.preventDefault()
                                    onClick(page - 1)
                                }}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink to={`?page=${page - 1}&query=${searchQuery}`}>{page - 1}</PaginationLink>
                        </PaginationItem>
                    </>
                }
                <PaginationItem>
                    <PaginationLink to={`?page=${page}&query=${searchQuery}`} isActive>{page}</PaginationLink>
                </PaginationItem>
                {
                    page === totalPages ? null : <>
                        <PaginationItem>
                            <PaginationLink to={`?page=${page + 1}&query=${searchQuery}`}>{page + 1}</PaginationLink>
                        </PaginationItem>
                        {
                            page + 1 === totalPages ? null : <>
                                <PaginationItem>
                                    <PaginationEllipsis/>
                                </PaginationItem>
                            </>
                        }
                        <PaginationItem>
                            <PaginationNext to={`?page=${page - 1}&query=${searchQuery}`}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                onClick(page + 1)
                                            }}
                            />
                        </PaginationItem>
                    </>
                }
            </PaginationContent>
        </Pagination>
    </div>;
}

