export class Reservation {
    firstNameParticipant!: string;
    lastNameParticipant!: string;
    emailParticipant!: string;
    nbPlace!: number;
    status!: Status;
    amount!: number;
}



export enum Status {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}