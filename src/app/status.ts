export class Status {
    
    ticketID: number;
    
    vaResident: boolean;
    
    firstName: string;
    
    lastName: string;
    
    email: string;
    
    organizationName: string;
    
    status: any;

    reason: ReasonCodeDto;
}

export class ReasonCodeDto {

    id;

    reasonCode;

    statusType;

    description;

    formID;

    createdBy;

    updatedBy;
}

export class StatusRequest {

    ticketID: number;

    email: string;
}