// Customer Model / Data Structure & Type Definitions
// Defines the customer schema and database access interfaces

export interface Customer {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  created_at?: string;
}

export interface CreateCustomerDTO {
  name: string;
  email?: string;
  phone?: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  email?: string;
  phone?: string;
}

// Model methods / data access signatures
export const CustomerModel = {
  // findAll: async () => {},
  // findById: async (id: string) => {},
  // create: async (data: CreateCustomerDTO) => {},
  // update: async (id: string, data: UpdateCustomerDTO) => {},
  // delete: async (id: string) => {},
};
