import { supabase } from '../config/supabase';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  is_verified?: boolean;
}

export const UserModel = {
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      throw new Error(`Database error finding user: ${error.message}`);
    }
    return data;
  },

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, is_verified, created_at, updated_at')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error finding user by ID: ${error.message}`);
    }
    return data;
  },

  async create(user: CreateUserInput): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: user.name.trim(),
        email: user.email.trim().toLowerCase(),
        password: user.password,
        is_verified: user.is_verified ?? false,
      })
      .select('id, name, email, is_verified, created_at, updated_at')
      .single();

    if (error) {
      throw new Error(`Database error creating user: ${error.message}`);
    }
    return data;
  },

  async updatePasswordAndName(email: string, name: string, passwordHash: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        name: name.trim(),
        password: passwordHash,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email.trim().toLowerCase())
      .select('id, name, email, is_verified, created_at, updated_at')
      .single();

    if (error) {
      throw new Error(`Database error updating user: ${error.message}`);
    }
    return data;
  },

  async updatePassword(email: string, passwordHash: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        password: passwordHash,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email.trim().toLowerCase())
      .select('id, name, email, is_verified, created_at, updated_at')
      .single();

    if (error) {
      throw new Error(`Database error updating password: ${error.message}`);
    }
    return data;
  },

  async markVerified(email: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({
        is_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email.trim().toLowerCase())
      .select('id, name, email, is_verified, created_at, updated_at')
      .single();

    if (error) {
      throw new Error(`Database error verifying user: ${error.message}`);
    }
    return data;
  },
};
