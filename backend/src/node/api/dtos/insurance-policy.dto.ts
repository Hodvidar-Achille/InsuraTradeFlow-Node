export class InsurancePolicyDto {
    id?: number;
    name: string;
    status: string;  // enum as string
    startDate: string;  // ISO date format (YYYY-MM-DD)
    endDate: string;    // ISO date format (YYYY-MM-DD)
    creationDateTime?: string;  // ISO timestamp
    updateDateTime?: string;    // ISO timestamp
}