export class Client {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  date_of_birth: Date;
  notes: string;
  status: string;
  tax_id_number: string;
  user?: any; // Adjust this type based on your user structure
  tags: string;
  company_info: string;

  constructor(
      id?: number,
      first_name?: string,
      last_name?: string,
      email?: string,
      phone_number?: string,
      address?: string,
      city?: string,
      province?: string,
      postal_code?: string,
      country?: string,
      date_of_birth?: Date,
      notes?: string,
      status?: string,
      tax_id_number?: string,
      user?: any, // Adjust this type based on your user structure
      tags?: string,
      company_info?: string
  ) {
      this.id = id || 0;
      this.first_name = first_name || '';
      this.last_name = last_name || '';
      this.email = email || '';
      this.phone_number = phone_number || '';
      this.address = address || '';
      this.city = city || '';
      this.province = province || '';
      this.postal_code = postal_code || '';
      this.country = country || '';
      this.date_of_birth = date_of_birth || new Date();
      this.notes = notes || '';
      this.status = status || '';
      this.tax_id_number = tax_id_number || '';
      this.user = user;
      this.tags = tags || '';
      this.company_info = company_info || '';
  }
}
