export interface Bill {
  slot: {
    slot_number: number;
    vehicle_number: string;
    vehicle_type: string;
    slot_charges: number;
    bill_id: number;
  };
  bill: {
    customer: {
      cutomer_id: number;
      name: string;
      email_address: string;
      phone_number: string;
    };
    time_in: string;
    time_out: string;
    total_charges: number;
  };
}
