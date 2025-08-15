
export class InsurancePolicyValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }

    // Optional: Add additional properties if needed
    // For example, you could add error codes or validation details
    readonly statusCode?: number = 400; // HTTP 400 Bad Request by default
}