type ProductPaginationProps = {
    totalPages: number;
}

export default function ProductPagination({
                                              totalPages,
                                          }: ProductPaginationProps) {
    return <div>ProductPagination {totalPages}</div>;
}