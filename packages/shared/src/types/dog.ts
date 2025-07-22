export interface Dog {
  _id?: string;
  name: string;
  breed: string;
  age: number;
  ownerId: string;
  walkingInstructions?: string;
  emergencyContact: string;
  medicalNotes?: string;
  isActive: boolean;
}

export interface CreateDogRequest {
  name: string;
  breed: string;
  age: number;
  walkingInstructions?: string;
  emergencyContact: string;
  medicalNotes?: string;
}
