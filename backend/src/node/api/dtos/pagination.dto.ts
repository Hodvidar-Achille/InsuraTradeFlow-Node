export class PaginationDto {
    page?: number;
    limit?: number;
}

export class PaginatedResultDto<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}