export class UserBackend {
    public id: number;
    public password?: string;
    public username: string;
    public email: string;
    public contactInfo?: string;
    public role_id?: number;
    public first_name: string;
    public last_name: string;
    public created_at: Date;
    public updated_at?: Date;
    public is_active: boolean;
    public roles: string;

  
    constructor(
      id: number = 0,
      username: string = '',
      email: string = '',
      first_name: string = '',
      last_name: string = '',
      created_at: Date = new Date(),
      is_active: boolean = true,
      roles: string = '',
      password?: string,
      contactInfo?: string,
      role_id?: number,
      updated_at?: Date
    ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.first_name = first_name;
      this.last_name = last_name;
      this.created_at = created_at;
      this.is_active = is_active;
      this.roles = roles;
      this.password = password;
      this.contactInfo = contactInfo;
      this.role_id = role_id;
      this.updated_at = updated_at;
    }
  }
  